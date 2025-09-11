/**
 * Secure Storage - Encrypted local storage for Smiley PWA
 * Features: Routing preservation, auto-lock timing, and session persistence
 */

interface EncryptedData {
  data: string;
  iv: string;
  salt: string;
  algorithm: string;
  keyDerivation: string;
  iterations: number;
}

interface SecuritySettings {
  encryptionEnabled: boolean;
  autoLockInterval: number; // minutes (0 = disabled)
  requirePasswordOnStartup: boolean;
  lastActivity: number;
  sessionDuration: number; // minutes (how long to remember unlock)
  unlockOnReload: boolean; // whether to stay unlocked across page reloads
}

interface UnlockSession {
  unlocked: boolean;
  sessionStart: number;
  lastActivity: number;
  duration: number; // minutes
  keyFingerprint: string; // hash of the key to validate
}

class SecureStorage {
  private static instance: SecureStorage;
  private cryptoKey: CryptoKey | null = null;
  private isUnlocked: boolean = false;
  private autoLockTimer: number | null = null;
  private activityTimer: number | null = null;
  private lastActivity: number = Date.now();

  private sessionData: UnlockSession | null = null;
  private readonly ALGORITHM = 'AES-GCM';
  private readonly KEY_DERIVATION = 'PBKDF2';
  private readonly ITERATIONS = 100000;
  private readonly KEY_LENGTH = 256;
  private readonly SESSION_KEY = 'smile-unlock-session';
  private readonly ACTIVITY_CHECK_INTERVAL = 30000; // 30 seconds

  private constructor() {
    this.setupActivityTracking();
    this.restoreSession();
    
    // Check if unlock modal should be shown on startup
    setTimeout(() => {
      this.checkAndShowUnlockModal();
    }, 100); // Small delay to ensure DOM is ready
  }

  static getInstance(): SecureStorage {
    if (!SecureStorage.instance) {
      SecureStorage.instance = new SecureStorage();
    }
    return SecureStorage.instance;
  }

  /**
   * Check if encryption is available and enabled
   */
  isEncryptionAvailable(): boolean {
    return 'crypto' in window && 'subtle' in window.crypto;
  }

  /**
   * Check if encryption is currently enabled
   */
  isEncryptionEnabled(): boolean {
    const settings = this.getSecuritySettings();
    return settings.encryptionEnabled && this.isEncryptionAvailable();
  }

  /**
   * Check if the storage is currently unlocked
   */
  isStorageUnlocked(): boolean {
    return this.isUnlocked && this.cryptoKey !== null;
  }

  /**
   * Get security settings with better defaults
   */
  getSecuritySettings(): SecuritySettings {
    try {
      const stored = localStorage.getItem('smile-security-settings');
      if (stored) {
        const settings = JSON.parse(stored);
        return {
          encryptionEnabled: false,
          autoLockInterval: 30,
          requirePasswordOnStartup: true,
          lastActivity: Date.now(),
          sessionDuration: 60, // 1 hour default
          unlockOnReload: true, // Stay unlocked across reloads by default
          ...settings
        };
      }
    } catch {
      // Ignore parse errors
    }
    
    return {
      encryptionEnabled: false,
      autoLockInterval: 30,
      requirePasswordOnStartup: true,
      lastActivity: Date.now(),
      sessionDuration: 60,
      unlockOnReload: true
    };
  }

  /**
   * Update security settings with improved session handling
   */
  updateSecuritySettings(settings: Partial<SecuritySettings>): void {
    const currentSettings = this.getSecuritySettings();
    const newSettings = { ...currentSettings, ...settings };
    localStorage.setItem('smile-security-settings', JSON.stringify(newSettings));
    
    // Update auto-lock timer when settings change
    this.setupAutoLock();
    
    // If session duration changed, update current session
    if (settings.sessionDuration && this.sessionData) {
      this.sessionData.duration = settings.sessionDuration;
      this.saveSession();
    }
  }

  /**
   * Enable encryption with password and migrate existing data
   */
  async enableEncryption(password: string): Promise<boolean> {
    if (!this.isEncryptionAvailable()) {
      throw new Error('Encryption not available in this browser');
    }

    try {
      const salt = window.crypto.getRandomValues(new Uint8Array(16));
      const key = await this.deriveKeyFromPassword(password, salt);
      
      // Test encryption/decryption
      const testData = 'encryption-test';
      const encrypted = await this.encryptWithKey(testData, key, salt);
      const decrypted = await this.decryptWithKey(encrypted, key);
      
      if (decrypted !== testData) {
        throw new Error('Encryption test failed');
      }

      // Store the encrypted test and salt for future validation
      localStorage.setItem('smile-encryption-test', JSON.stringify(encrypted));
      
      // Set up unlocked state first
      this.cryptoKey = key;
      this.isUnlocked = true;
      
      // Migrate existing unencrypted data to encrypted storage
      await this.migrateExistingDataToEncrypted();
      
      // Update settings after migration
      this.updateSecuritySettings({ encryptionEnabled: true });
      
      this.createSession(password);
      this.setupAutoLock();

      // Dispatch unlock event
      this.dispatchStorageEvent('unlocked');
      return true;
    } catch (error) {
      console.error('Failed to enable encryption:', error);
      return false;
    }
  }

  /**
   * Enhanced unlock with session management
   */
  async unlock(password: string, rememberSession: boolean = true): Promise<boolean> {
    if (!this.isEncryptionEnabled()) {
      return true; // Not encrypted, consider unlocked
    }

    try {
      const testData = localStorage.getItem('smile-encryption-test');
      if (!testData) {
        throw new Error('No encryption test data found');
      }

      const encrypted: EncryptedData = JSON.parse(testData);
      const salt = new Uint8Array(this.base64ToArrayBuffer(encrypted.salt));
      const key = await this.deriveKeyFromPassword(password, salt);
      
      // Test the key
      const decrypted = await this.decryptWithKey(encrypted, key);
      if (decrypted !== 'encryption-test') {
        return false;
      }

      // Successfully unlocked
      this.cryptoKey = key;
      this.isUnlocked = true;
      // Session remembering handled by sessionData
      
      if (rememberSession) {
        this.createSession(password);
      }
      
      this.updateActivity();
      this.setupAutoLock();

      // Dispatch unlock event
      this.dispatchStorageEvent('unlocked');
      return true;
    } catch (error) {
      console.error('Failed to unlock storage:', error);
      return false;
    }
  }

  /**
   * Enhanced lock with session cleanup
   */
  lock(): void {
    this.cryptoKey = null;
    this.isUnlocked = false;
    // Session state cleared
    this.sessionData = null;
    
    // Clear session storage
    sessionStorage.removeItem(this.SESSION_KEY);
    
    // Clear timers
    this.clearAutoLockTimer();
    this.clearActivityTimer();
    
    // Dispatch lock event
    this.dispatchStorageEvent('locked');
    
    // Automatically show unlock modal after locking
    setTimeout(() => {
      this.checkAndShowUnlockModal();
    }, 100);
  }

  /**
   * Disable encryption with data migration
   */
  async disableEncryption(currentPassword?: string): Promise<boolean> {
    // If not currently unlocked and encryption enabled, attempt unlock
    if (this.isEncryptionEnabled() && !this.isStorageUnlocked()) {
      if (!currentPassword || !await this.unlock(currentPassword)) {
        return false;
      }
    }

    try {
      // Decrypt all encrypted data back to regular storage
      await this.decryptAllStoredData();
      
      // Remove encryption artifacts
      localStorage.removeItem('smile-encryption-test');
      sessionStorage.removeItem(this.SESSION_KEY);
      
      // Update settings
      this.updateSecuritySettings({ encryptionEnabled: false });
      
      // Clear encryption state
      this.lock();
      
      return true;
    } catch (error) {
      console.error('Failed to disable encryption:', error);
      return false;
    }
  }

  /**
   * Change password with improved validation
   */
  async changePassword(currentPassword: string, newPassword: string): Promise<boolean> {
    if (!await this.unlock(currentPassword)) {
      return false;
    }

    try {
      // Get all current encrypted data
      const allData = await this.getAllDecryptedData();
      
      // Generate new key with new password
      const newSalt = window.crypto.getRandomValues(new Uint8Array(16));
      const newKey = await this.deriveKeyFromPassword(newPassword, newSalt);
      
      // Create new test data
      const testData = 'encryption-test';
      const newEncrypted = await this.encryptWithKey(testData, newKey, newSalt);
      localStorage.setItem('smile-encryption-test', JSON.stringify(newEncrypted));
      
      // Re-encrypt all data with new key
      this.cryptoKey = newKey;
      for (const [key, value] of Object.entries(allData)) {
        await this.setItem(key, value);
      }
      
      // Update session with new password
      this.createSession(newPassword);
      
      return true;
    } catch (error) {
      console.error('Failed to change password:', error);
      return false;
    }
  }

  /**
   * Enhanced secure storage with session validation
   */
  async setItem(key: string, value: any): Promise<void> {
    const dataToStore = JSON.stringify(value);
    
    if (!this.isEncryptionEnabled()) {
      // Store as regular localStorage if encryption is disabled
      localStorage.setItem(key, dataToStore);
      return;
    }
    
    if (!this.isStorageUnlocked()) {
      throw new Error('Storage is locked. Please unlock first.');
    }

    try {
      const salt = window.crypto.getRandomValues(new Uint8Array(16));
      const encrypted = await this.encryptWithKey(dataToStore, this.cryptoKey!, salt);
      const encryptedKey = `smile-encrypted-${key}`;
      localStorage.setItem(encryptedKey, JSON.stringify(encrypted));
      
      // Remove any plain text version
      localStorage.removeItem(key);
      this.updateActivity();
    } catch (error) {
      console.error('Failed to encrypt data:', error);
      throw error;
    }
  }

  /**
   * Enhanced secure retrieval with auto-unlock attempt
   */
  async getItem(key: string): Promise<any> {
    const encryptedKey = `smile-encrypted-${key}`;
    
    if (!this.isEncryptionEnabled()) {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : null;
    }

    if (!this.isStorageUnlocked()) {
      // Try to restore session first
      if (await this.attemptSessionRestore()) {
        // Session restored, continue with decryption
      } else {
        // Need to show unlock modal
        this.showUnlockModal();
        return null;
      }
    }

    try {
      const encryptedData = localStorage.getItem(encryptedKey);
      if (!encryptedData) {
        // Try fallback to plain storage
        const plainData = localStorage.getItem(key);
        return plainData ? JSON.parse(plainData) : null;
      }

      const encrypted: EncryptedData = JSON.parse(encryptedData);
      const decrypted = await this.decryptWithKey(encrypted, this.cryptoKey!);
      this.updateActivity();
      return JSON.parse(decrypted);
    } catch (error) {
      console.error('Failed to decrypt data:', error);
      return null;
    }
  }

  /**
   * Remove item from storage
   */
  removeItem(key: string): void {
    localStorage.removeItem(key);
    localStorage.removeItem(`smile-encrypted-${key}`);
  }

  /**
   * Check if storage needs unlock
   */
  needsUnlock(): boolean {
    return this.isEncryptionEnabled() && !this.isStorageUnlocked();
  }

  /**
   * Get all stored data keys (for debugging/management)
   */
  getStoredDataKeys(): { encrypted: string[], unencrypted: string[] } {
    const keys = Object.keys(localStorage);
    const encrypted: string[] = [];
    const unencrypted: string[] = [];
    
    keys.forEach(key => {
      if (key.startsWith('smile-')) {
        if (key.startsWith('smile-encrypted-')) {
          encrypted.push(key.replace('smile-encrypted-', ''));
        } else if (key !== 'smile-encryption-test' && key !== 'smile-security-settings') {
          unencrypted.push(key);
        }
      }
    });
    
    return { encrypted, unencrypted };
  }

  /**
   * Get auto-lock time remaining (in seconds)
   */
  getTimeUntilAutoLock(): number {
    if (!this.isStorageUnlocked()) return 0;
    
    const settings = this.getSecuritySettings();
    if (settings.autoLockInterval === 0) return -1; // Never
    
    const timeSinceActivity = Date.now() - this.lastActivity;
    const lockInterval = settings.autoLockInterval * 60 * 1000; // Convert to ms
    const remaining = lockInterval - timeSinceActivity;
    
    return Math.max(0, Math.floor(remaining / 1000));
  }

  /**
   * Clear all encrypted data
   */
  clearEncryptedData(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('smile-encrypted-')) {
        localStorage.removeItem(key);
      }
    });
  }

  /**
   * Reset and delete all data
   */
  async resetAndDeleteAllData(): Promise<void> {
    try {
      // Clear all Smile app data
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('smile-') || key.startsWith('smile-encrypted-')) {
          localStorage.removeItem(key);
        }
      });
      
      // Clear session data
      sessionStorage.removeItem(this.SESSION_KEY);
      
      // Lock storage
      this.lock();
      
      // Dispatch reset event
      window.dispatchEvent(new CustomEvent('smile:storage-reset'));
    } catch (err) {
      console.error('Failed to reset data:', err);
    }
  }

  // Private methods

  private createSession(password: string): void {
    const settings = this.getSecuritySettings();
    if (!settings.unlockOnReload) return;

    // Create a simple hash of the password for validation (not for security)
    const keyFingerprint = btoa(password.slice(0, 3) + password.slice(-3)).slice(0, 8);
    
    this.sessionData = {
      unlocked: true,
      sessionStart: Date.now(),
      lastActivity: Date.now(),
      duration: settings.sessionDuration,
      keyFingerprint: keyFingerprint
    };
    
    this.saveSession();
  }

  private saveSession(): void {
    if (this.sessionData) {
      this.sessionData.lastActivity = this.lastActivity;
      sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(this.sessionData));
    }
  }

  private restoreSession(): void {
    try {
      const sessionStr = sessionStorage.getItem(this.SESSION_KEY);
      if (!sessionStr) return;

      const session: UnlockSession = JSON.parse(sessionStr);
      const now = Date.now();
      const sessionAge = now - session.sessionStart;
      const maxSessionAge = session.duration * 60 * 1000; // Convert to ms

      // Check if session is still valid
      if (sessionAge < maxSessionAge && session.unlocked) {
        this.sessionData = session;
        this.lastActivity = session.lastActivity;
        // Don't automatically unlock here, just preserve session data
      } else {
        // Session expired
        sessionStorage.removeItem(this.SESSION_KEY);
      }
    } catch (error) {
      console.error('Failed to restore session:', error);
      sessionStorage.removeItem(this.SESSION_KEY);
    }
  }

  private async attemptSessionRestore(): Promise<boolean> {
    if (!this.sessionData || !this.isEncryptionEnabled()) return false;

    const now = Date.now();
    const sessionAge = now - this.sessionData.sessionStart;
    const maxSessionAge = this.sessionData.duration * 60 * 1000;

    if (sessionAge >= maxSessionAge) {
      // Session expired
      this.sessionData = null;
      sessionStorage.removeItem(this.SESSION_KEY);
      return false;
    }

    // Session is valid but we need the actual key
    // This would require storing the key securely, which we don't do for security
    // So we still need user to enter password, but we can skip some validation
    return false;
  }

  private showUnlockModal(): void {
    // Dispatch event to show unlock modal
    this.dispatchStorageEvent('unlock-required');
  }

  /**
   * Check if unlock is needed and automatically show unlock modal
   */
  checkAndShowUnlockModal(): void {
    if (this.needsUnlock()) {
      this.showUnlockModal();
    }
  }

  private setupActivityTracking(): void {
    const updateActivity = () => this.updateActivity();
    
    ['click', 'keydown', 'scroll', 'touchstart', 'mousemove'].forEach(event => {
      document.addEventListener(event, updateActivity, { passive: true });
    });

    // Set up activity monitoring
    this.activityTimer = window.setInterval(() => {
      this.checkAutoLock();
    }, this.ACTIVITY_CHECK_INTERVAL);
  }

  private updateActivity(): void {
    this.lastActivity = Date.now();
    
    // Update session if it exists
    if (this.sessionData) {
      this.saveSession();
    }
    
    // Update security settings
    const settings = this.getSecuritySettings();
    settings.lastActivity = this.lastActivity;
    this.updateSecuritySettings(settings);
  }

  private checkAutoLock(): void {
    if (!this.isStorageUnlocked()) return;

    const settings = this.getSecuritySettings();
    if (settings.autoLockInterval === 0) return; // Auto-lock disabled

    const timeSinceActivity = Date.now() - this.lastActivity;
    const lockInterval = settings.autoLockInterval * 60 * 1000; // Convert to ms

    if (timeSinceActivity >= lockInterval) {
      this.lock();
    }
  }

  private setupAutoLock(): void {
    this.clearAutoLockTimer();
    
    const settings = this.getSecuritySettings();
    if (settings.autoLockInterval === 0 || !this.isStorageUnlocked()) return;

    const lockInterval = settings.autoLockInterval * 60 * 1000; // Convert to ms
    this.autoLockTimer = window.setTimeout(() => {
      this.lock();
    }, lockInterval);
  }

  private clearAutoLockTimer(): void {
    if (this.autoLockTimer) {
      clearTimeout(this.autoLockTimer);
      this.autoLockTimer = null;
    }
  }

  private clearActivityTimer(): void {
    if (this.activityTimer) {
      clearInterval(this.activityTimer);
      this.activityTimer = null;
    }
  }

  private dispatchStorageEvent(type: 'locked' | 'unlocked' | 'unlock-required'): void {
    window.dispatchEvent(new CustomEvent(`smile:storage-${type}`, {
      detail: {
        isUnlocked: this.isUnlocked,
        isEncrypted: this.isEncryptionEnabled(),
        timeUntilAutoLock: this.getTimeUntilAutoLock()
      }
    }));
  }

  // Crypto helper methods
  private async deriveKeyFromPassword(password: string, salt: Uint8Array): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);
    
    const baseKey = await window.crypto.subtle.importKey(
      'raw',
      passwordBuffer,
      'PBKDF2',
      false,
      ['deriveKey']
    );

    return window.crypto.subtle.deriveKey(
      {
        name: this.KEY_DERIVATION,
        salt: salt as BufferSource,
        iterations: this.ITERATIONS,
        hash: 'SHA-256'
      },
      baseKey,
      {
        name: this.ALGORITHM,
        length: this.KEY_LENGTH
      },
      false,
      ['encrypt', 'decrypt']
    );
  }

  private async encryptWithKey(data: string, key: CryptoKey, salt: Uint8Array): Promise<EncryptedData> {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    const encrypted = await window.crypto.subtle.encrypt(
      {
        name: this.ALGORITHM,
        iv: iv
      },
      key,
      dataBuffer
    );

    return {
      data: this.arrayBufferToBase64(encrypted),
      iv: this.arrayBufferToBase64(iv.buffer),
      salt: this.arrayBufferToBase64(salt.buffer),
      algorithm: this.ALGORITHM,
      keyDerivation: this.KEY_DERIVATION,
      iterations: this.ITERATIONS
    };
  }

  private async decryptWithKey(encrypted: EncryptedData, key: CryptoKey): Promise<string> {
    const dataBuffer = this.base64ToArrayBuffer(encrypted.data);
    const iv = new Uint8Array(this.base64ToArrayBuffer(encrypted.iv));

    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: encrypted.algorithm,
        iv: iv
      },
      key,
      dataBuffer
    );

    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  }

  private arrayBufferToBase64(buffer: ArrayBuffer | ArrayBufferLike): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  private base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binary = window.atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }

  private async getAllDecryptedData(): Promise<Record<string, any>> {
    const result: Record<string, any> = {};
    const keys = Object.keys(localStorage);
    
    for (const key of keys) {
      if (key.startsWith('smile-encrypted-')) {
        const originalKey = key.replace('smile-encrypted-', '');
        const value = await this.getItem(originalKey);
        if (value !== null) {
          result[originalKey] = value;
        }
      }
    }
    
    return result;
  }

  private async decryptAllStoredData(): Promise<void> {
    const keys = Object.keys(localStorage);
    
    for (const key of keys) {
      if (key.startsWith('smile-encrypted-')) {
        const originalKey = key.replace('smile-encrypted-', '');
        const decryptedValue = await this.getItem(originalKey);
        
        if (decryptedValue !== null) {
          localStorage.setItem(originalKey, JSON.stringify(decryptedValue));
        }
        
        localStorage.removeItem(key);
      }
    }
  }

  /**
   * Migrate existing unencrypted data to encrypted storage
   */
  private async migrateExistingDataToEncrypted(): Promise<void> {
    const keys = Object.keys(localStorage);
    const dataToMigrate: Record<string, any> = {};
    
    // Find all smile-related data that isn't already encrypted or system data
    for (const key of keys) {
      if (key.startsWith('smile-') && 
          !key.startsWith('smile-encrypted-') && 
          key !== 'smile-encryption-test' && 
          key !== 'smile-security-settings' &&
          key !== 'smile-onboarding' &&
          key !== 'smile-journal-draft') {
        try {
          const value = localStorage.getItem(key);
          if (value) {
            // Try to parse as JSON, if it fails store as string
            try {
              dataToMigrate[key] = JSON.parse(value);
            } catch {
              dataToMigrate[key] = value;
            }
          }
        } catch (error) {
          console.warn(`Failed to migrate data for key: ${key}`, error);
        }
      }
    }
    
    // Encrypt and store the migrated data
    for (const [key, value] of Object.entries(dataToMigrate)) {
      try {
        await this.setItem(key, value);
        // Remove the original unencrypted version
        localStorage.removeItem(key);
      } catch (error) {
        console.error(`Failed to encrypt data for key: ${key}`, error);
      }
    }
  }
}

export default SecureStorage;
