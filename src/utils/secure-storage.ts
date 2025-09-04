/**
 * Secure Storage Utility
 * Provides AES-256-GCM encryption for local storage with password-based key derivation
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
}

class SecureStorage {
  private static instance: SecureStorage;
  private cryptoKey: CryptoKey | null = null;
  private isUnlocked: boolean = false;
  private autoLockTimer: number | null = null;
  private lastActivity: number = Date.now();
  private readonly ALGORITHM = 'AES-GCM';
  private readonly KEY_DERIVATION = 'PBKDF2';
  private readonly ITERATIONS = 100000;
  private readonly KEY_LENGTH = 256;

  private constructor() {
    this.setupActivityTracking();
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
   * Get security settings
   */
  getSecuritySettings(): SecuritySettings {
    try {
      const settings = localStorage.getItem('smile-security-settings');
      return settings ? JSON.parse(settings) : {
        encryptionEnabled: false,
        autoLockInterval: 30, // 30 minutes default
        requirePasswordOnStartup: true,
        lastActivity: Date.now()
      };
    } catch {
      return {
        encryptionEnabled: false,
        autoLockInterval: 30,
        requirePasswordOnStartup: true,
        lastActivity: Date.now()
      };
    }
  }

  /**
   * Update security settings
   */
  updateSecuritySettings(settings: Partial<SecuritySettings>): void {
    const currentSettings = this.getSecuritySettings();
    const newSettings = { ...currentSettings, ...settings };
    localStorage.setItem('smile-security-settings', JSON.stringify(newSettings));
    
    // Update auto-lock timer
    this.setupAutoLock();
  }

  /**
   * Enable encryption with password
   */
  async enableEncryption(password: string): Promise<boolean> {
    if (!this.isEncryptionAvailable()) {
      throw new Error('Encryption not available in this browser');
    }

    try {
      // Generate salt for this user
      const salt = window.crypto.getRandomValues(new Uint8Array(16));
      
      // Derive key from password
      const key = await this.deriveKeyFromPassword(password, salt);
      
      // Test encryption/decryption with a test string
      const testData = 'encryption-test';
      const encrypted = await this.encryptWithKey(testData, key, salt);
      const decrypted = await this.decryptWithKey(encrypted, key);
      
      if (decrypted !== testData) {
        throw new Error('Encryption test failed');
      }

      // Store salt for future use
      localStorage.setItem('smile-encryption-salt', this.arrayBufferToBase64(salt.buffer));
      
      // Update settings
      this.updateSecuritySettings({ 
        encryptionEnabled: true,
        lastActivity: Date.now()
      });

      // Set current session as unlocked
      this.cryptoKey = key;
      this.isUnlocked = true;
      this.updateActivity();

      return true;
    } catch (error) {
      console.error('Failed to enable encryption:', error);
      return false;
    }
  }

  /**
   * Unlock storage with password
   */
  async unlock(password: string): Promise<boolean> {
    if (!this.isEncryptionEnabled()) {
      this.isUnlocked = true;
      return true;
    }

    try {
      const saltBase64 = localStorage.getItem('smile-encryption-salt');
      if (!saltBase64) {
        throw new Error('Encryption salt not found');
      }

      const salt = this.base64ToArrayBuffer(saltBase64);
      const key = await this.deriveKeyFromPassword(password, new Uint8Array(salt));

      // Test with a known encrypted value
      const testKey = 'smile-encryption-test';
      const testData = localStorage.getItem(testKey);
      
      if (testData) {
        try {
          const encrypted: EncryptedData = JSON.parse(testData);
          await this.decryptWithKey(encrypted, key);
        } catch {
          return false; // Wrong password
        }
      } else {
        // Create test data for future validation
        const testValue = 'encryption-test-' + Date.now();
        const encrypted = await this.encryptWithKey(testValue, key, new Uint8Array(salt));
        localStorage.setItem(testKey, JSON.stringify(encrypted));
      }

      this.cryptoKey = key;
      this.isUnlocked = true;
      this.updateActivity();
      this.setupAutoLock();

      return true;
    } catch (error) {
      console.error('Failed to unlock storage:', error);
      return false;
    }
  }

  /**
   * Lock storage
   */
  lock(): void {
    this.cryptoKey = null;
    this.isUnlocked = false;
    this.clearAutoLockTimer();
    
    // Dispatch lock event
    window.dispatchEvent(new CustomEvent('smile:storage-locked'));
  }

  /**
   * Disable encryption (with current password verification)
   */
  async disableEncryption(currentPassword: string): Promise<boolean> {
    if (!await this.unlock(currentPassword)) {
      return false;
    }

    try {
      // Decrypt all encrypted data before disabling
      await this.decryptAllStoredData();
      
      // Remove encryption artifacts
      localStorage.removeItem('smile-encryption-salt');
      localStorage.removeItem('smile-encryption-test');
      
      // Update settings
      this.updateSecuritySettings({ encryptionEnabled: false });
      
      this.lock();
      return true;
    } catch (error) {
      console.error('Failed to disable encryption:', error);
      return false;
    }
  }

  /**
   * Change encryption password
   */
  async changePassword(currentPassword: string, newPassword: string): Promise<boolean> {
    if (!await this.unlock(currentPassword)) {
      return false;
    }

    try {
      // Get all encrypted data
      const allData = await this.getAllDecryptedData();
      
      // Generate new salt
      const newSalt = window.crypto.getRandomValues(new Uint8Array(16));
      const newKey = await this.deriveKeyFromPassword(newPassword, newSalt);
      
      // Re-encrypt all data with new key
      for (const [key, value] of Object.entries(allData)) {
        if (key.startsWith('smile-encrypted-')) {
          const encrypted = await this.encryptWithKey(JSON.stringify(value), newKey, newSalt);
          localStorage.setItem(key, JSON.stringify(encrypted));
        }
      }
      
      // Update salt
      localStorage.setItem('smile-encryption-salt', this.arrayBufferToBase64(newSalt.buffer));
      
      // Update test data
      const testValue = 'encryption-test-' + Date.now();
      const testEncrypted = await this.encryptWithKey(testValue, newKey, newSalt);
      localStorage.setItem('smile-encryption-test', JSON.stringify(testEncrypted));
      
      // Update current session
      this.cryptoKey = newKey;
      this.updateActivity();
      
      return true;
    } catch (error) {
      console.error('Failed to change password:', error);
      return false;
    }
  }

  /**
   * Securely store data
   */
  async setItem(key: string, value: any): Promise<void> {
    const dataToStore = JSON.stringify(value);
    
    if (!this.isEncryptionEnabled() || !this.isStorageUnlocked()) {
      // Store unencrypted
      localStorage.setItem(key, dataToStore);
      return;
    }

    try {
      const saltBase64 = localStorage.getItem('smile-encryption-salt');
      if (!saltBase64 || !this.cryptoKey) {
        throw new Error('Encryption not properly initialized');
      }

      const salt = new Uint8Array(this.base64ToArrayBuffer(saltBase64));
      const encrypted = await this.encryptWithKey(dataToStore, this.cryptoKey, salt);
      
      localStorage.setItem(`smile-encrypted-${key}`, JSON.stringify(encrypted));
      this.updateActivity();
    } catch (error) {
      console.error('Failed to encrypt data:', error);
      // Fallback to unencrypted storage
      localStorage.setItem(key, dataToStore);
    }
  }

  /**
   * Securely retrieve data
   */
  async getItem(key: string): Promise<any> {
    const encryptedKey = `smile-encrypted-${key}`;
    
    if (!this.isEncryptionEnabled() || !this.isStorageUnlocked()) {
      // Try encrypted first, then unencrypted
      const encryptedData = localStorage.getItem(encryptedKey);
      if (encryptedData && this.isEncryptionEnabled()) {
        // Data is encrypted but we're locked
        return null;
      }
      
      const unencryptedData = localStorage.getItem(key);
      return unencryptedData ? JSON.parse(unencryptedData) : null;
    }

    try {
      const encryptedData = localStorage.getItem(encryptedKey);
      if (encryptedData && this.cryptoKey) {
        const encrypted: EncryptedData = JSON.parse(encryptedData);
        const decrypted = await this.decryptWithKey(encrypted, this.cryptoKey);
        this.updateActivity();
        return JSON.parse(decrypted);
      }
      
      // Fallback to unencrypted data
      const unencryptedData = localStorage.getItem(key);
      return unencryptedData ? JSON.parse(unencryptedData) : null;
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
   * Danger: Reset and delete all Smile app data.
   * - Clears all keys starting with 'smile-' and 'smile-encrypted-'
   * - Removes encryption artifacts and settings
   * - Locks storage and dispatches a reset event
   */
  async resetAndDeleteAllData(): Promise<void> {
    try {
      // Remove encrypted payloads
      this.clearEncryptedData();

      // Remove all Smile keys (settings, flags, etc.)
      const keys = Object.keys(localStorage);
      for (const key of keys) {
        if (key.startsWith('smile-')) {
          localStorage.removeItem(key);
        }
      }

      // Ensure artifacts are gone
      localStorage.removeItem('smile-encryption-salt');
      localStorage.removeItem('smile-encryption-test');
      localStorage.removeItem('smile-security-settings');

      // Reset in-memory state
      this.cryptoKey = null;
      this.isUnlocked = false;
      this.clearAutoLockTimer();

      // Notify listeners
      window.dispatchEvent(new CustomEvent('smile:data-reset'));
      window.dispatchEvent(new CustomEvent('smile:storage-locked'));
    } catch (err) {
      console.error('resetAndDeleteAllData failed:', err);
      throw err;
    }
  }

  // Private methods

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

  private setupActivityTracking(): void {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, () => this.updateActivity(), true);
    });
  }

  private updateActivity(): void {
    this.lastActivity = Date.now();
    this.updateSecuritySettings({ lastActivity: this.lastActivity });
  }

  private setupAutoLock(): void {
    this.clearAutoLockTimer();
    
    const settings = this.getSecuritySettings();
    if (settings.autoLockInterval > 0 && this.isStorageUnlocked()) {
      const interval = settings.autoLockInterval * 60 * 1000; // Convert to milliseconds
      
      this.autoLockTimer = window.setTimeout(() => {
        const timeSinceActivity = Date.now() - this.lastActivity;
        if (timeSinceActivity >= interval) {
          this.lock();
        } else {
          // Reschedule for remaining time
          this.setupAutoLock();
        }
      }, interval);
    }
  }

  private clearAutoLockTimer(): void {
    if (this.autoLockTimer) {
      clearTimeout(this.autoLockTimer);
      this.autoLockTimer = null;
    }
  }

  private async getAllDecryptedData(): Promise<Record<string, any>> {
    const allData: Record<string, any> = {};
    const keys = Object.keys(localStorage);
    
    for (const key of keys) {
      if (key.startsWith('smile-encrypted-')) {
        const originalKey = key.replace('smile-encrypted-', '');
        const value = await this.getItem(originalKey);
        if (value !== null) {
          allData[key] = value;
        }
      }
    }
    
    return allData;
  }

  private async decryptAllStoredData(): Promise<void> {
    const keys = Object.keys(localStorage);
    
    for (const key of keys) {
      if (key.startsWith('smile-encrypted-')) {
        const originalKey = key.replace('smile-encrypted-', '');
        const value = await this.getItem(originalKey);
        
        if (value !== null) {
          // Store as unencrypted
          localStorage.setItem(originalKey, JSON.stringify(value));
          // Remove encrypted version
          localStorage.removeItem(key);
        }
      }
    }
  }
}

export default SecureStorage;
