/* empty css                                 */
import { e as createComponent, m as maybeRenderHead, r as renderTemplate, f as createAstro, h as addAttribute, k as renderComponent, l as renderScript } from '../chunks/astro/server_BTqpNUbh.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DUjdDrjv.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$NavigationSidebar = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<!-- Enhanced Left Sidebar - Fixed Navigation -->${maybeRenderHead()}<nav class="fixed left-0 top-0 h-full w-20 nav-sidebar flex flex-col items-center justify-center py-6 space-y-4 z-10"> <button class="nav-button nav-button-active" data-panel="chat" aria-label="Chat"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path> </svg> </button> <button class="nav-button" data-panel="memories" aria-label="Memories"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path> </svg> </button> <button class="nav-button" data-panel="history" aria-label="History"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> </button> <button class="nav-button" data-panel="journal" aria-label="Journal"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path> </svg> </button> <button class="nav-button" data-panel="exercises" aria-label="Mindfulness"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path> </svg> </button> <button class="nav-button" data-panel="profile" aria-label="Profile"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path> </svg> </button> <button class="nav-button" data-panel="settings" aria-label="Settings"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path> </svg> </button> </nav>`;
}, "/workspaces/smileyapp/src/components/NavigationSidebar.astro", void 0);

const $$ChatPanel = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<!-- Chat panel -->${maybeRenderHead()}<div id="panel-chat" class="flex-1 flex flex-col chat-panel app-panel"> <!-- Messages area --> <div id="messages-container" class="flex-1 overflow-y-auto px-6 py-8 space-y-4 min-h-[60vh]"> <!-- Empty state --> <div id="empty-state" class="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto"> <div class="mb-8"> <div class="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6"> <svg class="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path> </svg> </div> <h2 class="text-2xl font-medium text-on-surface mb-3">Start a conversation</h2> <p class="text-on-surface-variant">Share what's on your mind and let's explore it together</p> </div> </div> </div> <!-- Modern floating message composer --> <div class="p-6 pb-8"> <div class="modern-chat-input"> <div class="chat-input-container"> <textarea id="message-input" class="chat-textarea" placeholder="Message Smile AI..." rows="1"></textarea> <button id="send-btn" class="chat-send-btn"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path> </svg> </button> </div> </div> </div> </div>`;
}, "/workspaces/smileyapp/src/components/panels/ChatPanel.astro", void 0);

const $$Astro = createAstro();
const $$ViewToggle = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ViewToggle;
  const { panelId } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="view-toggle-container"> <div class="view-toggle"${addAttribute(panelId, "data-panel-id")}> <button class="view-toggle-btn active" data-view="tiles" aria-label="List view - peaceful flow" title="List view"> <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" d="M6 8h12M6 12h12M6 16h8"></path> </svg> </button> <button class="view-toggle-btn" data-view="grid" aria-label="Grid view - organized harmony" title="Grid view"> <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" d="M3 6a3 3 0 013-3h2a3 3 0 013 3v2a3 3 0 01-3 3H6a3 3 0 01-3-3V6zM3 16a3 3 0 013-3h2a3 3 0 013 3v2a3 3 0 01-3 3H6a3 3 0 01-3-3v-2zM13 6a3 3 0 013-3h2a3 3 0 013 3v2a3 3 0 01-3 3h-2a3 3 0 01-3-3V6zM13 16a3 3 0 013-3h2a3 3 0 013 3v2a3 3 0 01-3 3h-2a3 3 0 01-3-3v-2z"></path> </svg> </button> </div> </div>`;
}, "/workspaces/smileyapp/src/components/ViewToggle.astro", void 0);

const $$MemoriesPanel = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="panel-memories" class="flex-1 flex flex-col hidden app-panel"> <div class="p-6 max-w-4xl mx-auto w-full"> <!-- Panel Header --> <div class="panel-section-header"> <div class="header-left-section"> <div class="section-title"> <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path> </svg>
Memories
</div> <div class="section-count-island"> <span class="section-count">9</span> </div> </div> ${renderComponent($$result, "ViewToggle", $$ViewToggle, { "panelId": "panel-memories" })} </div> <div class="memory-grid" id="memories-container"> <!-- Compact memory cards --> <div class="memory-card" data-date="2025-08-23"> <div class="memory-card-actions"> <button class="memory-delete-btn" data-memory-id="mem-1" title="Delete memory"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"></path> </svg> </button> </div> <div class="memory-date">2 hours ago</div> <p class="memory-excerpt">We talked about your morning anxiety and how 4-7-8 breathing has been helping you start the day more calmly. You mentioned it works especially well when you do it before getting out of bed.</p> </div> <div class="memory-card" data-date="2025-08-22"> <div class="memory-card-actions"> <button class="memory-delete-btn" data-memory-id="mem-2" title="Delete memory"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"></path> </svg> </button> </div> <div class="memory-date">Yesterday</div> <p class="memory-excerpt">You shared that your new evening routine is working well - reading for 20 minutes and doing light stretches has helped you fall asleep faster. You're sleeping about 30 minutes earlier now.</p> </div> <div class="memory-card" data-date="2025-08-20"> <div class="memory-card-actions"> <button class="memory-delete-btn" data-memory-id="mem-3" title="Delete memory"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"></path> </svg> </button> </div> <div class="memory-date">3 days ago</div> <p class="memory-excerpt">You mentioned feeling guilty about saying no to extra work requests, even though it's affecting your mental health. We discussed strategies for setting clearer boundaries without feeling selfish.</p> </div> <div class="memory-card" data-date="2025-08-18"> <div class="memory-card-actions"> <button class="memory-delete-btn" data-memory-id="mem-4" title="Delete memory"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"></path> </svg> </button> </div> <div class="memory-date">5 days ago</div> <p class="memory-excerpt">You were excited to share that you completed your first full 10-minute meditation session without getting distracted. You said it felt like a real accomplishment after weeks of practice.</p> </div> <div class="memory-card" data-date="2025-08-15"> <div class="memory-card-actions"> <button class="memory-delete-btn" data-memory-id="mem-5" title="Delete memory"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"></path> </svg> </button> </div> <div class="memory-date">1 week ago</div> <p class="memory-excerpt">You told me about your weekend visit with family and how you practiced the grounding techniques we discussed when feeling overwhelmed during dinner conversations.</p> </div> <div class="memory-card" data-date="2025-08-12"> <div class="memory-card-actions"> <button class="memory-delete-btn" data-memory-id="mem-6" title="Delete memory"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"></path> </svg> </button> </div> <div class="memory-date">11 days ago</div> <p class="memory-excerpt">You noticed that your weekend hikes consistently improve your mood and energy levels. You said being in nature makes you feel more like yourself and less anxious about social situations.</p> </div> <div class="memory-card" data-date="2025-08-10"> <div class="memory-card-actions"> <button class="memory-delete-btn" data-memory-id="mem-7" title="Delete memory"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"></path> </svg> </button> </div> <div class="memory-date">2 weeks ago</div> <p class="memory-excerpt">You shared your frustration about procrastination and we explored how perfectionism might be the root cause. You realized that "done is better than perfect" resonates with you.</p> </div> <div class="memory-card" data-date="2025-08-05"> <div class="memory-card-actions"> <button class="memory-delete-btn" data-memory-id="mem-8" title="Delete memory"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"></path> </svg> </button> </div> <div class="memory-date">3 weeks ago</div> <p class="memory-excerpt">We discussed your social anxiety before the team meeting. You tried the visualization technique and said it helped you feel more confident speaking up during discussions.</p> </div> <div class="memory-card" data-date="2025-08-01"> <div class="memory-card-actions"> <button class="memory-delete-btn" data-memory-id="mem-9" title="Delete memory"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"></path> </svg> </button> </div> <div class="memory-date">4 weeks ago</div> <p class="memory-excerpt">You mentioned starting a gratitude journal after our conversation about mindfulness. You were surprised how focusing on small positive moments shifted your daily perspective.</p> </div> </div> </div> </div>`;
}, "/workspaces/smileyapp/src/components/panels/MemoriesPanel.astro", void 0);

const $$HistoryPanel = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="panel-history" class="flex-1 flex flex-col hidden app-panel"> <div class="p-6 max-w-4xl mx-auto w-full"> <!-- Panel Header --> <div class="panel-section-header"> <div class="header-left-section"> <div class="section-title"> <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg>
Chat History
</div> <div class="section-count-island"> <span class="section-count">3</span> </div> </div> ${renderComponent($$result, "ViewToggle", $$ViewToggle, { "panelId": "panel-history" })} </div> <!-- Search Bar --> <div class="mb-6"> <div class="search-container"> <svg class="search-icon w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path> </svg> <input type="text" id="history-search" class="search-input" placeholder="Search conversations..." autocomplete="off"> <button id="clear-search" class="clear-search-btn hidden"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path> </svg> </button> </div> </div> <!-- History Content - Compact conversation cards --> <div class="memory-grid" id="history-container" data-view-container> <!-- Conversation history cards --> <div class="memory-card" data-date="2025-08-23"> <div class="memory-card-actions"> <button class="memory-delete-btn" data-conversation-id="conv-1" title="Delete conversation"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"></path> </svg> </button> </div> <div class="conversation-header"> <span class="memory-date">2 hours ago</span> <div class="conversation-stats"> <span class="conversation-stat">18 messages</span> <span class="conversation-stat">22 min</span> </div> </div> <p class="memory-excerpt">
We discussed your morning anxiety patterns and explored breathing techniques. You mentioned feeling overwhelmed when waking up, and we worked through a 4-7-8 breathing exercise that seemed to help calm your nervous system.
</p> </div> <div class="memory-card" data-date="2025-08-22"> <div class="memory-card-actions"> <button class="memory-delete-btn" data-conversation-id="conv-2" title="Delete conversation"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"></path> </svg> </button> </div> <div class="conversation-header"> <span class="memory-date">Yesterday</span> <div class="conversation-stats"> <span class="conversation-stat">31 messages</span> <span class="conversation-stat">38 min</span> </div> </div> <p class="memory-excerpt">
Long conversation about setting realistic goals and improving productivity. We created a personalized evening routine to help with sleep quality and discussed strategies for maintaining motivation during challenging periods.
</p> </div> <div class="memory-card" data-date="2025-08-20"> <div class="memory-card-actions"> <button class="memory-delete-btn" data-conversation-id="conv-3" title="Delete conversation"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"></path> </svg> </button> </div> <div class="conversation-header"> <span class="memory-date">3 days ago</span> <div class="conversation-stats"> <span class="conversation-stat">24 messages</span> <span class="conversation-stat">29 min</span> </div> </div> <p class="memory-excerpt">
Discussion about work stress and setting healthy boundaries. We explored mindfulness techniques for managing overwhelming workdays and practiced a brief body scan meditation together.
</p> </div> </div> </div> </div>`;
}, "/workspaces/smileyapp/src/components/panels/HistoryPanel.astro", void 0);

const $$JournalPanel = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="panel-journal" class="flex-1 flex flex-col hidden app-panel"> <div class="p-4 max-w-4xl mx-auto w-full"> <!-- Panel Header --> <div class="panel-section-header"> <div class="header-left-section"> <div class="section-title"> <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path> </svg>
Personal Journal
</div> <div class="section-count-island"> <span class="section-count">3</span> </div> </div> <div class="header-actions"> <button id="new-journal-btn" class="journal-compose-btn" title="Write new entry"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path> </svg>
New Entry
</button> ${renderComponent($$result, "ViewToggle", $$ViewToggle, { "panelId": "panel-journal" })} </div> </div> <!-- Journal Entries --> <div class="journal-entries-container" id="journal-entries" data-view-container> <!-- Sample entries --> <div class="journal-entry-card-enhanced" data-date="2025-08-23"> <div class="journal-entry-actions"> <button class="journal-edit-btn" data-journal-id="journal-1" title="Edit entry"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path> </svg> </button> <button class="journal-delete-btn" data-journal-id="journal-1" title="Delete entry"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"></path> </svg> </button> </div> <div class="journal-entry-header"> <div class="journal-entry-date-bg"> <div class="journal-date-day">23</div> <div class="journal-date-month">Aug</div> </div> <div class="journal-entry-meta"> <h4 class="journal-entry-title">Morning Reflections</h4> <div class="journal-entry-info"> <span class="journal-entry-time">8:30 AM</span> <span class="journal-entry-mood">😊</span> <span class="journal-entry-privacy private">
Private
</span> </div> </div> </div> <div class="journal-entry-content">
Started the day with gratitude practice. Feeling more centered and ready to tackle the challenges ahead. The morning walk really helped clear my mind and set positive intentions for the day. Looking forward to what today brings.
</div> </div> <div class="journal-entry-card-enhanced" data-date="2025-08-22"> <div class="journal-entry-actions"> <button class="journal-edit-btn" data-journal-id="journal-2" title="Edit entry"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path> </svg> </button> <button class="journal-delete-btn" data-journal-id="journal-2" title="Delete entry"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"></path> </svg> </button> </div> <div class="journal-entry-header"> <div class="journal-entry-date-bg"> <div class="journal-date-day">22</div> <div class="journal-date-month">Aug</div> </div> <div class="journal-entry-meta"> <h4 class="journal-entry-title">Evening Wind Down</h4> <div class="journal-entry-info"> <span class="journal-entry-time">9:15 PM</span> <span class="journal-entry-mood">😐</span> <span class="journal-entry-privacy shared">
Shared
</span> </div> </div> </div> <div class="journal-entry-content">
Had a mixed day today. Work was stressful but the team meeting went well. Looking forward to a better tomorrow. Need to remember to take breaks more often and not let the pressure build up so much.
</div> </div> <div class="journal-entry-card-enhanced" data-date="2025-08-21"> <div class="journal-entry-actions"> <button class="journal-edit-btn" data-journal-id="journal-3" title="Edit entry"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path> </svg> </button> <button class="journal-delete-btn" data-journal-id="journal-3" title="Delete entry"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"></path> </svg> </button> </div> <div class="journal-entry-header"> <div class="journal-entry-date-bg"> <div class="journal-date-day">21</div> <div class="journal-date-month">Aug</div> </div> <div class="journal-entry-meta"> <h4 class="journal-entry-title">Breakthrough Moment</h4> <div class="journal-entry-info"> <span class="journal-entry-time">7:45 PM</span> <span class="journal-entry-mood">😊</span> <span class="journal-entry-privacy private">
Private
</span> </div> </div> </div> <div class="journal-entry-content">
Finally understood what my therapist meant about mindful breathing. The afternoon anxiety episode was much more manageable using the techniques we discussed. This feels like real progress in managing my stress responses.
</div> </div> </div> </div> </div> ${renderScript($$result, "/workspaces/smileyapp/src/components/panels/JournalPanel.astro?astro&type=script&index=0&lang.ts")}`;
}, "/workspaces/smileyapp/src/components/panels/JournalPanel.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$RelaxationModal = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a$1 || (_a$1 = __template$1(["<!-- Fullscreen Relaxation Modal -->", `<div id="relaxation-modal" class="relaxation-modal hidden" data-astro-cid-racii4eb> <!-- Background with animated gradient --> <div class="relaxation-backdrop" data-astro-cid-racii4eb> <div class="relaxation-bg-gradient" data-astro-cid-racii4eb></div> <div class="relaxation-particles" data-astro-cid-racii4eb> <div class="particle" data-astro-cid-racii4eb></div> <div class="particle" data-astro-cid-racii4eb></div> <div class="particle" data-astro-cid-racii4eb></div> <div class="particle" data-astro-cid-racii4eb></div> <div class="particle" data-astro-cid-racii4eb></div> <div class="particle" data-astro-cid-racii4eb></div> </div> </div> <!-- Main Content Container --> <div class="relaxation-container" data-astro-cid-racii4eb> <!-- Header with close button --> <div class="relaxation-header" data-astro-cid-racii4eb> <button id="close-relaxation" class="relaxation-close-btn" data-astro-cid-racii4eb> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-racii4eb> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-astro-cid-racii4eb></path> </svg> </button> </div> <!-- Central Breathing Animation --> <div class="relaxation-content" data-astro-cid-racii4eb> <!-- Top Section: Session Info --> <div class="top-section" data-astro-cid-racii4eb> <div class="session-info" data-astro-cid-racii4eb> <h2 id="relaxation-title" class="session-title" data-astro-cid-racii4eb>4-7-8 Breathing</h2> <p id="relaxation-subtitle" class="session-subtitle" data-astro-cid-racii4eb>Calming breath technique for deep relaxation</p> </div> </div> <!-- Middle Section: Breathing Circle --> <div class="middle-section" data-astro-cid-racii4eb> <div class="breathing-container" data-astro-cid-racii4eb> <!-- Outer rings with ripple effects --> <div class="breathing-ring ring-1" data-astro-cid-racii4eb></div> <div class="breathing-ring ring-2" data-astro-cid-racii4eb></div> <div class="breathing-ring ring-3" data-astro-cid-racii4eb></div> <!-- Main breathing orb --> <div id="breathing-orb" class="breathing-orb" data-astro-cid-racii4eb> <div class="orb-inner" data-astro-cid-racii4eb> <div class="orb-center" data-astro-cid-racii4eb> <div class="orb-pulse" data-astro-cid-racii4eb></div> </div> </div> <!-- Breathing guides --> <div class="breathing-guides" data-astro-cid-racii4eb> <div class="guide-line guide-top" data-astro-cid-racii4eb></div> <div class="guide-line guide-right" data-astro-cid-racii4eb></div> <div class="guide-line guide-bottom" data-astro-cid-racii4eb></div> <div class="guide-line guide-left" data-astro-cid-racii4eb></div> </div> </div> <!-- Progress arc --> <div class="progress-arc" data-astro-cid-racii4eb> <svg class="progress-circle" viewBox="0 0 200 200" data-astro-cid-racii4eb> <circle cx="100" cy="100" r="90" class="progress-track" data-astro-cid-racii4eb></circle> <circle id="progress-path" cx="100" cy="100" r="90" class="progress-fill" data-astro-cid-racii4eb></circle> </svg> </div> </div> </div> <!-- Bottom Section: Instructions and Controls --> <div class="bottom-section" data-astro-cid-racii4eb> <!-- Instructions and Phase Display --> <div class="instruction-panel" data-astro-cid-racii4eb> <div id="current-phase" class="current-phase" data-astro-cid-racii4eb>Prepare to begin</div> <div id="breathing-instruction" class="breathing-instruction" data-astro-cid-racii4eb>Click start when you're ready</div> <div id="phase-counter" class="phase-counter" data-astro-cid-racii4eb></div> </div> <!-- Timer and Progress --> <div class="session-progress" data-astro-cid-racii4eb> <div class="timer-display" data-astro-cid-racii4eb> <span id="session-timer" class="timer-text" data-astro-cid-racii4eb>05:00</span> <span class="timer-label" data-astro-cid-racii4eb>remaining</span> </div> <div class="session-stats" data-astro-cid-racii4eb> <div class="stat-item" data-astro-cid-racii4eb> <span id="breath-count" class="stat-value" data-astro-cid-racii4eb>0</span> <span class="stat-label" data-astro-cid-racii4eb>breaths</span> </div> <div class="stat-item" data-astro-cid-racii4eb> <span id="cycle-count" class="stat-value" data-astro-cid-racii4eb>0</span> <span class="stat-label" data-astro-cid-racii4eb>cycles</span> </div> </div> </div> <!-- Control Panel --> <div class="control-panel" data-astro-cid-racii4eb> <button id="start-relaxation" class="control-btn primary" data-astro-cid-racii4eb> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-racii4eb> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-racii4eb></path> </svg>
Start Session
</button> <button id="pause-relaxation" class="control-btn secondary hidden" data-astro-cid-racii4eb> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-racii4eb> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-racii4eb></path> </svg>
Pause
</button> <button id="reset-relaxation" class="control-btn outlined hidden" data-astro-cid-racii4eb> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-racii4eb> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-astro-cid-racii4eb></path> </svg>
Reset
</button> </div> </div> </div> </div>  <script>
// @ts-nocheck
// Relaxation Modal Controller
class RelaxationController {
  constructor() {
    this.isActive = false;
    this.isPaused = false;
    this.currentExercise = null;
    this.sessionTimer = null;
    this.phaseTimer = null;
    this.timeElapsed = 0;
    this.totalDuration = 0;
    this.currentPhaseIndex = 0;
    this.phaseTimeElapsed = 0;
    this.breathCount = 0;
    this.cycleCount = 0;
    
    this.exercises = {
      '4-7-8': {
        title: '4-7-8 Breathing',
        subtitle: 'Calming breath technique for deep relaxation',
        duration: 300, // 5 minutes
        phases: [
          { name: 'Inhale', duration: 4, instruction: 'Breathe in slowly through your nose', class: 'inhale' },
          { name: 'Hold', duration: 7, instruction: 'Hold your breath gently', class: 'hold' },
          { name: 'Exhale', duration: 8, instruction: 'Exhale completely through your mouth', class: 'exhale' },
          { name: 'Rest', duration: 2, instruction: 'Rest before the next cycle', class: 'rest' }
        ]
      },
      'box': {
        title: 'Box Breathing',
        subtitle: 'Equal breathing for focus and calm',
        duration: 180, // 3 minutes
        phases: [
          { name: 'Inhale', duration: 4, instruction: 'Breathe in slowly and deeply', class: 'inhale' },
          { name: 'Hold', duration: 4, instruction: 'Hold your breath steadily', class: 'hold' },
          { name: 'Exhale', duration: 4, instruction: 'Breathe out slowly and completely', class: 'exhale' },
          { name: 'Hold', duration: 4, instruction: 'Hold empty before next breath', class: 'hold' }
        ]
      },
      '5-4-3-2-1': {
        title: '5-4-3-2-1 Grounding',
        subtitle: 'Sensory awareness for present moment',
        duration: 180, // 3 minutes
        phases: [
          { name: 'See', duration: 36, instruction: 'Notice 5 things you can see around you', class: 'observe' },
          { name: 'Touch', duration: 36, instruction: 'Notice 4 things you can touch', class: 'observe' },
          { name: 'Hear', duration: 36, instruction: 'Notice 3 things you can hear', class: 'observe' },
          { name: 'Smell', duration: 36, instruction: 'Notice 2 things you can smell', class: 'observe' },
          { name: 'Taste', duration: 36, instruction: 'Notice 1 thing you can taste', class: 'observe' }
        ]
      }
    };
    
    this.initializeEventListeners();
  }
  
  initializeEventListeners() {
    // Close button
    document.getElementById('close-relaxation')?.addEventListener('click', () => this.closeModal());
    
    // Control buttons
    document.getElementById('start-relaxation')?.addEventListener('click', () => this.startSession());
    document.getElementById('pause-relaxation')?.addEventListener('click', () => this.togglePause());
    document.getElementById('reset-relaxation')?.addEventListener('click', () => this.resetSession());
    
    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isModalOpen()) {
        this.closeModal();
      }
    });
  }
  
  openModal(exerciseType) {
    console.log('Opening modal for exercise:', exerciseType);
    this.currentExercise = this.exercises[exerciseType];
    
    if (!this.currentExercise) {
      console.error('Exercise not found:', exerciseType, 'Available exercises:', Object.keys(this.exercises));
      return;
    }
    
    console.log('Exercise found:', this.currentExercise);
    this.totalDuration = this.currentExercise.duration;
    this.resetSession();
    this.updateModalContent();
    
    const modal = document.getElementById('relaxation-modal');
    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.add('show'), 50);
    
    document.body.style.overflow = 'hidden';
  }
  
  closeModal() {
    const modal = document.getElementById('relaxation-modal');
    modal.classList.remove('show');
    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }, 800);
    
    this.resetSession();
  }
  
  isModalOpen() {
    return !document.getElementById('relaxation-modal').classList.contains('hidden');
  }
  
  updateModalContent() {
    document.getElementById('relaxation-title').textContent = this.currentExercise.title;
    document.getElementById('relaxation-subtitle').textContent = this.currentExercise.subtitle;
    document.getElementById('session-timer').textContent = this.formatTime(this.totalDuration);
    document.getElementById('current-phase').textContent = 'Prepare to begin';
    document.getElementById('breathing-instruction').textContent = 'Click start when you\\'re ready';
    document.getElementById('phase-counter').textContent = '';
    document.getElementById('breath-count').textContent = '0';
    document.getElementById('cycle-count').textContent = '0';
  }
  
  startSession() {
    if (this.isPaused) {
      this.isPaused = false;
      document.getElementById('pause-relaxation').innerHTML = \`
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        Pause
      \`;
    } else {
      this.isActive = true;
      this.timeElapsed = 0;
      this.currentPhaseIndex = 0;
      this.phaseTimeElapsed = 0;
      this.breathCount = 0;
      this.cycleCount = 0;
    }
    
    this.showControlButtons();
    this.startSessionTimer();
    this.startPhaseTimer();
    
    // Initialize adaptive speed
    const breathingContainer = document.querySelector('.breathing-container');
    this.setAdaptiveSpeed(breathingContainer);
    
    // Remove any paused states
    this.setBreathingAnimationPaused(false);
  }
  
  togglePause() {
    this.isPaused = !this.isPaused;
    const pauseBtn = document.getElementById('pause-relaxation');
    const breathingContainer = document.querySelector('.breathing-container');
    const currentPhaseEl = document.getElementById('current-phase');
    const instructionEl = document.getElementById('breathing-instruction');
    const timerEl = document.getElementById('session-timer');
    const statsItems = document.querySelectorAll('.stat-item');
    
    if (this.isPaused) {
      clearInterval(this.sessionTimer);
      clearInterval(this.phaseTimer);
      
      // Add paused classes for visual feedback
      breathingContainer?.classList.add('paused');
      currentPhaseEl?.classList.add('paused');
      instructionEl?.classList.add('paused');
      timerEl?.classList.add('paused');
      statsItems.forEach(item => item.classList.add('paused'));
      
      pauseBtn.innerHTML = \`
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        Resume
      \`;
      document.getElementById('current-phase').textContent = 'Paused';
      document.getElementById('breathing-instruction').textContent = 'Session paused - click resume to continue';
      this.setBreathingAnimationPaused(true);
    } else {
      // Remove paused classes
      breathingContainer?.classList.remove('paused');
      currentPhaseEl?.classList.remove('paused');
      instructionEl?.classList.remove('paused');
      timerEl?.classList.remove('paused');
      statsItems.forEach(item => item.classList.remove('paused'));
      
      this.startSessionTimer();
      this.startPhaseTimer();
      this.setBreathingAnimationPaused(false);
      pauseBtn.innerHTML = \`
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        Pause
      \`;
    }
  }
  
  resetSession() {
    this.isActive = false;
    this.isPaused = false;
    this.timeElapsed = 0;
    this.currentPhaseIndex = 0;
    this.phaseTimeElapsed = 0;
    this.breathCount = 0;
    this.cycleCount = 0;
    
    clearInterval(this.sessionTimer);
    clearInterval(this.phaseTimer);
    
    this.hideControlButtons();
    this.resetBreathingAnimation();
    this.resetProgressArc();
    
    if (this.currentExercise) {
      this.updateModalContent();
    }
  }
  
  showControlButtons() {
    document.getElementById('start-relaxation').classList.add('hidden');
    document.getElementById('pause-relaxation').classList.remove('hidden');
    document.getElementById('reset-relaxation').classList.remove('hidden');
  }
  
  hideControlButtons() {
    document.getElementById('start-relaxation').classList.remove('hidden');
    document.getElementById('pause-relaxation').classList.add('hidden');
    document.getElementById('reset-relaxation').classList.add('hidden');
  }
  
  startSessionTimer() {
    this.sessionTimer = setInterval(() => {
      if (!this.isPaused) {
        this.timeElapsed++;
        const remainingTime = this.totalDuration - this.timeElapsed;
        document.getElementById('session-timer').textContent = this.formatTime(remainingTime);
        
        // Update progress arc
        const progress = (this.timeElapsed / this.totalDuration) * 565.48;
        document.getElementById('progress-path').style.strokeDashoffset = 565.48 - progress;
        
        if (remainingTime <= 0) {
          this.completeSession();
        }
      }
    }, 1000);
  }
  
  startPhaseTimer() {
    this.phaseTimer = setInterval(() => {
      if (!this.isPaused) {
        const currentPhase = this.currentExercise.phases[this.currentPhaseIndex];
        
        this.updatePhaseDisplay(currentPhase);
        this.updateBreathingAnimation(currentPhase);
        
        this.phaseTimeElapsed++;
        
        if (this.phaseTimeElapsed >= currentPhase.duration) {
          this.nextPhase();
        }
      }
    }, 1000);
  }
  
  nextPhase() {
    this.phaseTimeElapsed = 0;
    
    // Check if we completed a full breathing cycle
    if (this.currentPhaseIndex === this.currentExercise.phases.length - 1) {
      this.cycleCount++;
      this.breathCount++;
      document.getElementById('cycle-count').textContent = this.cycleCount.toString();
      document.getElementById('breath-count').textContent = this.breathCount.toString();
    }
    
    this.currentPhaseIndex = (this.currentPhaseIndex + 1) % this.currentExercise.phases.length;
  }
  
  updatePhaseDisplay(phase) {
    const remainingTime = phase.duration - this.phaseTimeElapsed;
    
    document.getElementById('current-phase').textContent = phase.name;
    document.getElementById('breathing-instruction').textContent = phase.instruction;
    document.getElementById('phase-counter').textContent = \`\${remainingTime}s remaining\`;
  }
  
  updateBreathingAnimation(phase) {
    const orb = document.getElementById('breathing-orb');
    const breathingContainer = document.querySelector('.breathing-container');
    const rings = document.querySelectorAll('.breathing-ring');
    
    // Remove all phase classes from orb
    orb.classList.remove('inhale', 'hold', 'exhale', 'rest', 'observe');
    
    // Remove phase classes from rings as well
    rings.forEach(ring => {
      ring.classList.remove('inhale', 'hold', 'exhale', 'rest', 'observe');
    });
    
    // Add current phase class to orb (rings will respond via CSS sibling selectors)
    if (phase.class) {
      orb.classList.add(phase.class);
      
      // Also add to rings for additional control if needed
      rings.forEach(ring => {
        ring.classList.add(phase.class);
      });
    }
    
    // Set adaptive speed based on exercise type
    this.setAdaptiveSpeed(breathingContainer);
  }
  
  setAdaptiveSpeed(container) {
    if (!container) return;
    
    // Remove all speed classes
    container.classList.remove('speed-slow', 'speed-normal', 'speed-fast', 'speed-4-7-8', 'speed-box', 'speed-grounding');
    
    // Add speed class based on current exercise
    if (this.currentExercise) {
      const exerciseKey = Object.keys(this.exercises).find(key => 
        this.exercises[key] === this.currentExercise
      );
      
      switch (exerciseKey) {
        case '4-7-8':
          container.classList.add('speed-4-7-8');
          break;
        case 'box':
          container.classList.add('speed-box');
          break;
        case '5-4-3-2-1':
          container.classList.add('speed-grounding');
          break;
        default:
          container.classList.add('speed-normal');
      }
    }
  }
  
  setBreathingAnimationPaused(isPaused) {
    const orb = document.getElementById('breathing-orb');
    const breathingContainer = document.querySelector('.breathing-container');
    
    if (isPaused) {
      orb?.classList.add('paused');
      breathingContainer?.classList.add('paused');
    } else {
      orb?.classList.remove('paused');
      breathingContainer?.classList.remove('paused');
    }
  }
  
  resetBreathingAnimation() {
    const orb = document.getElementById('breathing-orb');
    const breathingContainer = document.querySelector('.breathing-container');
    const rings = document.querySelectorAll('.breathing-ring');
    
    orb?.classList.remove('inhale', 'hold', 'exhale', 'rest', 'observe', 'paused');
    breathingContainer?.classList.remove('paused');
    
    // Reset rings as well
    rings.forEach(ring => {
      ring.classList.remove('inhale', 'hold', 'exhale', 'rest', 'observe', 'paused');
    });
    
    // Remove all visual pause states
    document.getElementById('current-phase')?.classList.remove('paused');
    document.getElementById('breathing-instruction')?.classList.remove('paused');
    document.getElementById('session-timer')?.classList.remove('paused');
    document.querySelectorAll('.stat-item').forEach(item => item.classList.remove('paused'));
  }
  
  resetProgressArc() {
    document.getElementById('progress-path').style.strokeDashoffset = '565.48';
  }
  
  completeSession() {
    this.isActive = false;
    clearInterval(this.sessionTimer);
    clearInterval(this.phaseTimer);
    
    // Show completion state
    document.getElementById('current-phase').textContent = 'Complete';
    document.getElementById('breathing-instruction').textContent = 'Session completed! Well done.';
    document.getElementById('phase-counter').textContent = \`\${this.cycleCount} cycles completed\`;
    document.getElementById('session-timer').textContent = '00:00';
    
    this.hideControlButtons();
    this.resetBreathingAnimation();
    
    // Auto-close after delay
    setTimeout(() => {
      this.closeModal();
    }, 3000);
    
    // Update progress in localStorage
    this.updateProgress();
  }
  
  updateProgress() {
    const progress = JSON.parse(localStorage.getItem('meditationProgress') || '{"sessions": 0, "minutes": 0, "lastSession": null}');
    
    progress.sessions += 1;
    progress.minutes += Math.floor(this.totalDuration / 60);
    progress.lastSession = new Date().toISOString().split('T')[0];
    
    localStorage.setItem('meditationProgress', JSON.stringify(progress));
    
    // Trigger progress update in exercises panel if visible
    if (typeof window.updateExerciseProgress === 'function') {
      window.updateExerciseProgress(progress);
    }
  }
  
  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return \`\${mins.toString().padStart(2, '0')}:\${secs.toString().padStart(2, '0')}\`;
  }
}

// Create global instance
window.relaxationController = new RelaxationController();

// Global function to open relaxation modal
window.openRelaxationModal = function(exerciseType) {
  window.relaxationController.openModal(exerciseType);
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('Relaxation Modal initialized');
});
<\/script></div>`], ["<!-- Fullscreen Relaxation Modal -->", `<div id="relaxation-modal" class="relaxation-modal hidden" data-astro-cid-racii4eb> <!-- Background with animated gradient --> <div class="relaxation-backdrop" data-astro-cid-racii4eb> <div class="relaxation-bg-gradient" data-astro-cid-racii4eb></div> <div class="relaxation-particles" data-astro-cid-racii4eb> <div class="particle" data-astro-cid-racii4eb></div> <div class="particle" data-astro-cid-racii4eb></div> <div class="particle" data-astro-cid-racii4eb></div> <div class="particle" data-astro-cid-racii4eb></div> <div class="particle" data-astro-cid-racii4eb></div> <div class="particle" data-astro-cid-racii4eb></div> </div> </div> <!-- Main Content Container --> <div class="relaxation-container" data-astro-cid-racii4eb> <!-- Header with close button --> <div class="relaxation-header" data-astro-cid-racii4eb> <button id="close-relaxation" class="relaxation-close-btn" data-astro-cid-racii4eb> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-racii4eb> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-astro-cid-racii4eb></path> </svg> </button> </div> <!-- Central Breathing Animation --> <div class="relaxation-content" data-astro-cid-racii4eb> <!-- Top Section: Session Info --> <div class="top-section" data-astro-cid-racii4eb> <div class="session-info" data-astro-cid-racii4eb> <h2 id="relaxation-title" class="session-title" data-astro-cid-racii4eb>4-7-8 Breathing</h2> <p id="relaxation-subtitle" class="session-subtitle" data-astro-cid-racii4eb>Calming breath technique for deep relaxation</p> </div> </div> <!-- Middle Section: Breathing Circle --> <div class="middle-section" data-astro-cid-racii4eb> <div class="breathing-container" data-astro-cid-racii4eb> <!-- Outer rings with ripple effects --> <div class="breathing-ring ring-1" data-astro-cid-racii4eb></div> <div class="breathing-ring ring-2" data-astro-cid-racii4eb></div> <div class="breathing-ring ring-3" data-astro-cid-racii4eb></div> <!-- Main breathing orb --> <div id="breathing-orb" class="breathing-orb" data-astro-cid-racii4eb> <div class="orb-inner" data-astro-cid-racii4eb> <div class="orb-center" data-astro-cid-racii4eb> <div class="orb-pulse" data-astro-cid-racii4eb></div> </div> </div> <!-- Breathing guides --> <div class="breathing-guides" data-astro-cid-racii4eb> <div class="guide-line guide-top" data-astro-cid-racii4eb></div> <div class="guide-line guide-right" data-astro-cid-racii4eb></div> <div class="guide-line guide-bottom" data-astro-cid-racii4eb></div> <div class="guide-line guide-left" data-astro-cid-racii4eb></div> </div> </div> <!-- Progress arc --> <div class="progress-arc" data-astro-cid-racii4eb> <svg class="progress-circle" viewBox="0 0 200 200" data-astro-cid-racii4eb> <circle cx="100" cy="100" r="90" class="progress-track" data-astro-cid-racii4eb></circle> <circle id="progress-path" cx="100" cy="100" r="90" class="progress-fill" data-astro-cid-racii4eb></circle> </svg> </div> </div> </div> <!-- Bottom Section: Instructions and Controls --> <div class="bottom-section" data-astro-cid-racii4eb> <!-- Instructions and Phase Display --> <div class="instruction-panel" data-astro-cid-racii4eb> <div id="current-phase" class="current-phase" data-astro-cid-racii4eb>Prepare to begin</div> <div id="breathing-instruction" class="breathing-instruction" data-astro-cid-racii4eb>Click start when you're ready</div> <div id="phase-counter" class="phase-counter" data-astro-cid-racii4eb></div> </div> <!-- Timer and Progress --> <div class="session-progress" data-astro-cid-racii4eb> <div class="timer-display" data-astro-cid-racii4eb> <span id="session-timer" class="timer-text" data-astro-cid-racii4eb>05:00</span> <span class="timer-label" data-astro-cid-racii4eb>remaining</span> </div> <div class="session-stats" data-astro-cid-racii4eb> <div class="stat-item" data-astro-cid-racii4eb> <span id="breath-count" class="stat-value" data-astro-cid-racii4eb>0</span> <span class="stat-label" data-astro-cid-racii4eb>breaths</span> </div> <div class="stat-item" data-astro-cid-racii4eb> <span id="cycle-count" class="stat-value" data-astro-cid-racii4eb>0</span> <span class="stat-label" data-astro-cid-racii4eb>cycles</span> </div> </div> </div> <!-- Control Panel --> <div class="control-panel" data-astro-cid-racii4eb> <button id="start-relaxation" class="control-btn primary" data-astro-cid-racii4eb> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-racii4eb> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-racii4eb></path> </svg>
Start Session
</button> <button id="pause-relaxation" class="control-btn secondary hidden" data-astro-cid-racii4eb> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-racii4eb> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-racii4eb></path> </svg>
Pause
</button> <button id="reset-relaxation" class="control-btn outlined hidden" data-astro-cid-racii4eb> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-racii4eb> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-astro-cid-racii4eb></path> </svg>
Reset
</button> </div> </div> </div> </div>  <script>
// @ts-nocheck
// Relaxation Modal Controller
class RelaxationController {
  constructor() {
    this.isActive = false;
    this.isPaused = false;
    this.currentExercise = null;
    this.sessionTimer = null;
    this.phaseTimer = null;
    this.timeElapsed = 0;
    this.totalDuration = 0;
    this.currentPhaseIndex = 0;
    this.phaseTimeElapsed = 0;
    this.breathCount = 0;
    this.cycleCount = 0;
    
    this.exercises = {
      '4-7-8': {
        title: '4-7-8 Breathing',
        subtitle: 'Calming breath technique for deep relaxation',
        duration: 300, // 5 minutes
        phases: [
          { name: 'Inhale', duration: 4, instruction: 'Breathe in slowly through your nose', class: 'inhale' },
          { name: 'Hold', duration: 7, instruction: 'Hold your breath gently', class: 'hold' },
          { name: 'Exhale', duration: 8, instruction: 'Exhale completely through your mouth', class: 'exhale' },
          { name: 'Rest', duration: 2, instruction: 'Rest before the next cycle', class: 'rest' }
        ]
      },
      'box': {
        title: 'Box Breathing',
        subtitle: 'Equal breathing for focus and calm',
        duration: 180, // 3 minutes
        phases: [
          { name: 'Inhale', duration: 4, instruction: 'Breathe in slowly and deeply', class: 'inhale' },
          { name: 'Hold', duration: 4, instruction: 'Hold your breath steadily', class: 'hold' },
          { name: 'Exhale', duration: 4, instruction: 'Breathe out slowly and completely', class: 'exhale' },
          { name: 'Hold', duration: 4, instruction: 'Hold empty before next breath', class: 'hold' }
        ]
      },
      '5-4-3-2-1': {
        title: '5-4-3-2-1 Grounding',
        subtitle: 'Sensory awareness for present moment',
        duration: 180, // 3 minutes
        phases: [
          { name: 'See', duration: 36, instruction: 'Notice 5 things you can see around you', class: 'observe' },
          { name: 'Touch', duration: 36, instruction: 'Notice 4 things you can touch', class: 'observe' },
          { name: 'Hear', duration: 36, instruction: 'Notice 3 things you can hear', class: 'observe' },
          { name: 'Smell', duration: 36, instruction: 'Notice 2 things you can smell', class: 'observe' },
          { name: 'Taste', duration: 36, instruction: 'Notice 1 thing you can taste', class: 'observe' }
        ]
      }
    };
    
    this.initializeEventListeners();
  }
  
  initializeEventListeners() {
    // Close button
    document.getElementById('close-relaxation')?.addEventListener('click', () => this.closeModal());
    
    // Control buttons
    document.getElementById('start-relaxation')?.addEventListener('click', () => this.startSession());
    document.getElementById('pause-relaxation')?.addEventListener('click', () => this.togglePause());
    document.getElementById('reset-relaxation')?.addEventListener('click', () => this.resetSession());
    
    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isModalOpen()) {
        this.closeModal();
      }
    });
  }
  
  openModal(exerciseType) {
    console.log('Opening modal for exercise:', exerciseType);
    this.currentExercise = this.exercises[exerciseType];
    
    if (!this.currentExercise) {
      console.error('Exercise not found:', exerciseType, 'Available exercises:', Object.keys(this.exercises));
      return;
    }
    
    console.log('Exercise found:', this.currentExercise);
    this.totalDuration = this.currentExercise.duration;
    this.resetSession();
    this.updateModalContent();
    
    const modal = document.getElementById('relaxation-modal');
    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.add('show'), 50);
    
    document.body.style.overflow = 'hidden';
  }
  
  closeModal() {
    const modal = document.getElementById('relaxation-modal');
    modal.classList.remove('show');
    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }, 800);
    
    this.resetSession();
  }
  
  isModalOpen() {
    return !document.getElementById('relaxation-modal').classList.contains('hidden');
  }
  
  updateModalContent() {
    document.getElementById('relaxation-title').textContent = this.currentExercise.title;
    document.getElementById('relaxation-subtitle').textContent = this.currentExercise.subtitle;
    document.getElementById('session-timer').textContent = this.formatTime(this.totalDuration);
    document.getElementById('current-phase').textContent = 'Prepare to begin';
    document.getElementById('breathing-instruction').textContent = 'Click start when you\\\\'re ready';
    document.getElementById('phase-counter').textContent = '';
    document.getElementById('breath-count').textContent = '0';
    document.getElementById('cycle-count').textContent = '0';
  }
  
  startSession() {
    if (this.isPaused) {
      this.isPaused = false;
      document.getElementById('pause-relaxation').innerHTML = \\\`
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        Pause
      \\\`;
    } else {
      this.isActive = true;
      this.timeElapsed = 0;
      this.currentPhaseIndex = 0;
      this.phaseTimeElapsed = 0;
      this.breathCount = 0;
      this.cycleCount = 0;
    }
    
    this.showControlButtons();
    this.startSessionTimer();
    this.startPhaseTimer();
    
    // Initialize adaptive speed
    const breathingContainer = document.querySelector('.breathing-container');
    this.setAdaptiveSpeed(breathingContainer);
    
    // Remove any paused states
    this.setBreathingAnimationPaused(false);
  }
  
  togglePause() {
    this.isPaused = !this.isPaused;
    const pauseBtn = document.getElementById('pause-relaxation');
    const breathingContainer = document.querySelector('.breathing-container');
    const currentPhaseEl = document.getElementById('current-phase');
    const instructionEl = document.getElementById('breathing-instruction');
    const timerEl = document.getElementById('session-timer');
    const statsItems = document.querySelectorAll('.stat-item');
    
    if (this.isPaused) {
      clearInterval(this.sessionTimer);
      clearInterval(this.phaseTimer);
      
      // Add paused classes for visual feedback
      breathingContainer?.classList.add('paused');
      currentPhaseEl?.classList.add('paused');
      instructionEl?.classList.add('paused');
      timerEl?.classList.add('paused');
      statsItems.forEach(item => item.classList.add('paused'));
      
      pauseBtn.innerHTML = \\\`
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        Resume
      \\\`;
      document.getElementById('current-phase').textContent = 'Paused';
      document.getElementById('breathing-instruction').textContent = 'Session paused - click resume to continue';
      this.setBreathingAnimationPaused(true);
    } else {
      // Remove paused classes
      breathingContainer?.classList.remove('paused');
      currentPhaseEl?.classList.remove('paused');
      instructionEl?.classList.remove('paused');
      timerEl?.classList.remove('paused');
      statsItems.forEach(item => item.classList.remove('paused'));
      
      this.startSessionTimer();
      this.startPhaseTimer();
      this.setBreathingAnimationPaused(false);
      pauseBtn.innerHTML = \\\`
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        Pause
      \\\`;
    }
  }
  
  resetSession() {
    this.isActive = false;
    this.isPaused = false;
    this.timeElapsed = 0;
    this.currentPhaseIndex = 0;
    this.phaseTimeElapsed = 0;
    this.breathCount = 0;
    this.cycleCount = 0;
    
    clearInterval(this.sessionTimer);
    clearInterval(this.phaseTimer);
    
    this.hideControlButtons();
    this.resetBreathingAnimation();
    this.resetProgressArc();
    
    if (this.currentExercise) {
      this.updateModalContent();
    }
  }
  
  showControlButtons() {
    document.getElementById('start-relaxation').classList.add('hidden');
    document.getElementById('pause-relaxation').classList.remove('hidden');
    document.getElementById('reset-relaxation').classList.remove('hidden');
  }
  
  hideControlButtons() {
    document.getElementById('start-relaxation').classList.remove('hidden');
    document.getElementById('pause-relaxation').classList.add('hidden');
    document.getElementById('reset-relaxation').classList.add('hidden');
  }
  
  startSessionTimer() {
    this.sessionTimer = setInterval(() => {
      if (!this.isPaused) {
        this.timeElapsed++;
        const remainingTime = this.totalDuration - this.timeElapsed;
        document.getElementById('session-timer').textContent = this.formatTime(remainingTime);
        
        // Update progress arc
        const progress = (this.timeElapsed / this.totalDuration) * 565.48;
        document.getElementById('progress-path').style.strokeDashoffset = 565.48 - progress;
        
        if (remainingTime <= 0) {
          this.completeSession();
        }
      }
    }, 1000);
  }
  
  startPhaseTimer() {
    this.phaseTimer = setInterval(() => {
      if (!this.isPaused) {
        const currentPhase = this.currentExercise.phases[this.currentPhaseIndex];
        
        this.updatePhaseDisplay(currentPhase);
        this.updateBreathingAnimation(currentPhase);
        
        this.phaseTimeElapsed++;
        
        if (this.phaseTimeElapsed >= currentPhase.duration) {
          this.nextPhase();
        }
      }
    }, 1000);
  }
  
  nextPhase() {
    this.phaseTimeElapsed = 0;
    
    // Check if we completed a full breathing cycle
    if (this.currentPhaseIndex === this.currentExercise.phases.length - 1) {
      this.cycleCount++;
      this.breathCount++;
      document.getElementById('cycle-count').textContent = this.cycleCount.toString();
      document.getElementById('breath-count').textContent = this.breathCount.toString();
    }
    
    this.currentPhaseIndex = (this.currentPhaseIndex + 1) % this.currentExercise.phases.length;
  }
  
  updatePhaseDisplay(phase) {
    const remainingTime = phase.duration - this.phaseTimeElapsed;
    
    document.getElementById('current-phase').textContent = phase.name;
    document.getElementById('breathing-instruction').textContent = phase.instruction;
    document.getElementById('phase-counter').textContent = \\\`\\\${remainingTime}s remaining\\\`;
  }
  
  updateBreathingAnimation(phase) {
    const orb = document.getElementById('breathing-orb');
    const breathingContainer = document.querySelector('.breathing-container');
    const rings = document.querySelectorAll('.breathing-ring');
    
    // Remove all phase classes from orb
    orb.classList.remove('inhale', 'hold', 'exhale', 'rest', 'observe');
    
    // Remove phase classes from rings as well
    rings.forEach(ring => {
      ring.classList.remove('inhale', 'hold', 'exhale', 'rest', 'observe');
    });
    
    // Add current phase class to orb (rings will respond via CSS sibling selectors)
    if (phase.class) {
      orb.classList.add(phase.class);
      
      // Also add to rings for additional control if needed
      rings.forEach(ring => {
        ring.classList.add(phase.class);
      });
    }
    
    // Set adaptive speed based on exercise type
    this.setAdaptiveSpeed(breathingContainer);
  }
  
  setAdaptiveSpeed(container) {
    if (!container) return;
    
    // Remove all speed classes
    container.classList.remove('speed-slow', 'speed-normal', 'speed-fast', 'speed-4-7-8', 'speed-box', 'speed-grounding');
    
    // Add speed class based on current exercise
    if (this.currentExercise) {
      const exerciseKey = Object.keys(this.exercises).find(key => 
        this.exercises[key] === this.currentExercise
      );
      
      switch (exerciseKey) {
        case '4-7-8':
          container.classList.add('speed-4-7-8');
          break;
        case 'box':
          container.classList.add('speed-box');
          break;
        case '5-4-3-2-1':
          container.classList.add('speed-grounding');
          break;
        default:
          container.classList.add('speed-normal');
      }
    }
  }
  
  setBreathingAnimationPaused(isPaused) {
    const orb = document.getElementById('breathing-orb');
    const breathingContainer = document.querySelector('.breathing-container');
    
    if (isPaused) {
      orb?.classList.add('paused');
      breathingContainer?.classList.add('paused');
    } else {
      orb?.classList.remove('paused');
      breathingContainer?.classList.remove('paused');
    }
  }
  
  resetBreathingAnimation() {
    const orb = document.getElementById('breathing-orb');
    const breathingContainer = document.querySelector('.breathing-container');
    const rings = document.querySelectorAll('.breathing-ring');
    
    orb?.classList.remove('inhale', 'hold', 'exhale', 'rest', 'observe', 'paused');
    breathingContainer?.classList.remove('paused');
    
    // Reset rings as well
    rings.forEach(ring => {
      ring.classList.remove('inhale', 'hold', 'exhale', 'rest', 'observe', 'paused');
    });
    
    // Remove all visual pause states
    document.getElementById('current-phase')?.classList.remove('paused');
    document.getElementById('breathing-instruction')?.classList.remove('paused');
    document.getElementById('session-timer')?.classList.remove('paused');
    document.querySelectorAll('.stat-item').forEach(item => item.classList.remove('paused'));
  }
  
  resetProgressArc() {
    document.getElementById('progress-path').style.strokeDashoffset = '565.48';
  }
  
  completeSession() {
    this.isActive = false;
    clearInterval(this.sessionTimer);
    clearInterval(this.phaseTimer);
    
    // Show completion state
    document.getElementById('current-phase').textContent = 'Complete';
    document.getElementById('breathing-instruction').textContent = 'Session completed! Well done.';
    document.getElementById('phase-counter').textContent = \\\`\\\${this.cycleCount} cycles completed\\\`;
    document.getElementById('session-timer').textContent = '00:00';
    
    this.hideControlButtons();
    this.resetBreathingAnimation();
    
    // Auto-close after delay
    setTimeout(() => {
      this.closeModal();
    }, 3000);
    
    // Update progress in localStorage
    this.updateProgress();
  }
  
  updateProgress() {
    const progress = JSON.parse(localStorage.getItem('meditationProgress') || '{"sessions": 0, "minutes": 0, "lastSession": null}');
    
    progress.sessions += 1;
    progress.minutes += Math.floor(this.totalDuration / 60);
    progress.lastSession = new Date().toISOString().split('T')[0];
    
    localStorage.setItem('meditationProgress', JSON.stringify(progress));
    
    // Trigger progress update in exercises panel if visible
    if (typeof window.updateExerciseProgress === 'function') {
      window.updateExerciseProgress(progress);
    }
  }
  
  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return \\\`\\\${mins.toString().padStart(2, '0')}:\\\${secs.toString().padStart(2, '0')}\\\`;
  }
}

// Create global instance
window.relaxationController = new RelaxationController();

// Global function to open relaxation modal
window.openRelaxationModal = function(exerciseType) {
  window.relaxationController.openModal(exerciseType);
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('Relaxation Modal initialized');
});
<\/script></div>`])), maybeRenderHead());
}, "/workspaces/smileyapp/src/components/RelaxationModal.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$ExercisesPanel = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", '<div id="panel-exercises" class="flex-1 flex flex-col hidden app-panel"> <div class="p-6 max-w-4xl mx-auto w-full"> <!-- Panel Header --> <div class="panel-section-header"> <div class="header-left-section"> <div class="section-title"> <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path> </svg>\nMindfulness Studio\n</div> <div class="section-count-island"> <span class="section-count" id="exercises-count">8</span> </div> </div> ', ' </div> <!-- Exercise Entries --> <div class="journal-entries-container" id="exercises-container" data-view-container> <!-- Progress Summary Card --> <div class="journal-entry-card-enhanced progress-stats-card"> <div class="progress-stats-header"> <div class="progress-stats-icon"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path> </svg> </div> <div class="progress-stats-title"> <h3 class="progress-title">Mindfulness Progress</h3> <p class="progress-subtitle">Track your meditation journey</p> </div> </div> <div class="progress-stats-grid"> <div class="progress-stat-item"> <div class="stat-value" id="total-sessions">0</div> <div class="stat-label">Sessions</div> <div class="stat-indicator sessions"></div> </div> <div class="progress-stat-item"> <div class="stat-value" id="total-minutes">0</div> <div class="stat-label">Minutes</div> <div class="stat-indicator minutes"></div> </div> <div class="progress-stat-item"> <div class="stat-value" id="streak-days">0</div> <div class="stat-label">Day Streak</div> <div class="stat-indicator streak"></div> </div> </div> </div> <!-- Breathing Exercises --> <div class="journal-entry-card-enhanced exercise-card" data-exercise="4-7-8"> <div class="journal-entry-header"> <div class="journal-entry-date-bg"> <div class="journal-date-day">4-7-8</div> <div class="journal-date-month">Breathing</div> </div> <div class="journal-entry-meta"> <h4 class="journal-entry-title">4-7-8 Breathing</h4> <div class="journal-entry-info"> <span class="journal-entry-time">5 min</span> <span class="exercise-difficulty">Beginner</span> </div> </div> </div> <div class="journal-entry-content">\nA powerful technique to activate your parasympathetic nervous system. Inhale for 4, hold for 7, exhale for 8 counts. Perfect for reducing anxiety and promoting relaxation.\n<div class="mt-4"> <button class="meditation-start-btn" data-exercise="4-7-8"> <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg>\nStart Session\n</button> </div> </div> </div> <div class="journal-entry-card-enhanced exercise-card" data-exercise="box"> <div class="journal-entry-header"> <div class="journal-entry-date-bg"> <div class="journal-date-day">Box</div> <div class="journal-date-month">Breathing</div> </div> <div class="journal-entry-meta"> <h4 class="journal-entry-title">Box Breathing</h4> <div class="journal-entry-info"> <span class="journal-entry-time">3 min</span> <span class="exercise-difficulty">Intermediate</span> </div> </div> </div> <div class="journal-entry-content">\nEqual counts for inhale, hold, exhale, and hold. Perfect for building concentration and reducing stress. Used by military and first responders.\n<div class="mt-4"> <button class="meditation-start-btn" data-exercise="box"> <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg>\nStart Session\n</button> </div> </div> </div> <div class="journal-entry-card-enhanced exercise-card" data-exercise="5-4-3-2-1"> <div class="journal-entry-header"> <div class="journal-entry-date-bg"> <div class="journal-date-day">5-4-3</div> <div class="journal-date-month">Grounding</div> </div> <div class="journal-entry-meta"> <h4 class="journal-entry-title">5-4-3-2-1 Grounding</h4> <div class="journal-entry-info"> <span class="journal-entry-time">3 min</span> <span class="exercise-difficulty">Anxiety Relief</span> </div> </div> </div> <div class="journal-entry-content">\nSensory grounding technique for anxiety relief. Notice 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste. Anchor yourself in the present moment.\n<div class="mt-4"> <button class="meditation-start-btn" data-exercise="5-4-3-2-1"> <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg>\nStart Session\n</button> </div> </div> </div> </div> </div> </div> <!-- Include the new Relaxation Modal --> ', ` <script>
// @ts-nocheck
// Enhanced Exercise Panel with Relaxation Modal Integration
class ExercisePanel {
  constructor() {
    this.initializeEventListeners();
    this.loadProgress();
  }
  
  initializeEventListeners() {
    // Exercise start buttons - now opens the new relaxation modal
    document.querySelectorAll('.meditation-start-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const exerciseType = btn.getAttribute('data-exercise');
        if (window.openRelaxationModal) {
          window.openRelaxationModal(exerciseType);
        }
      });
    });
  }
  
  loadProgress() {
    const progress = JSON.parse(localStorage.getItem('meditationProgress') || '{"sessions": 0, "minutes": 0, "lastSession": null}');
    this.displayProgress(progress);
  }
  
  displayProgress(progress) {
    document.getElementById('total-sessions').textContent = progress.sessions;
    document.getElementById('total-minutes').textContent = progress.minutes;
    
    // Calculate streak
    const today = new Date().toISOString().split('T')[0];
    const lastSession = progress.lastSession;
    let streak = 0;
    
    if (lastSession === today) {
      streak = 1; // Simplified streak calculation
    }
    
    document.getElementById('streak-days').textContent = streak;
  }
}

// Global function for relaxation modal to update progress
window.updateExerciseProgress = function(progress) {
  const panel = new ExercisePanel();
  panel.displayProgress(progress);
};

// Initialize exercise panel when page loads
document.addEventListener('DOMContentLoaded', () => {
  new ExercisePanel();
});
<\/script>`])), maybeRenderHead(), renderComponent($$result, "ViewToggle", $$ViewToggle, { "panelId": "panel-exercises" }), renderComponent($$result, "RelaxationModal", $$RelaxationModal, {}));
}, "/workspaces/smileyapp/src/components/panels/ExercisesPanel.astro", void 0);

const $$ProfilePanel = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="panel-profile" class="flex-1 flex flex-col hidden app-panel"> <div class="p-6 max-w-4xl mx-auto w-full"> <!-- Panel Header --> <div class="panel-section-header"> <div class="header-left-section"> <div class="section-title"> <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path> </svg>
Personal Profile
</div> <div class="section-count-island"> <span class="section-count" id="profile-completion">0%</span> </div> </div> <button class="journal-compose-btn" id="clear-profile"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path> </svg>
Clear All
</button> </div> <!-- Panel Description --> <div class="setting-group mb-6"> <p class="text-on-surface-variant text-sm leading-relaxed">
Help me understand you better so I can provide more personalized support and guidance.
<span class="text-primary font-medium">All information stays private on your device.</span> </p> </div> <!-- Profile Settings --> <div class="space-y-6"> <!-- Basic Info Group --> <div class="setting-group"> <h4 class="setting-title"> <svg class="w-5 h-5 inline mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path> </svg>
Basic Information
</h4> <div class="space-y-4"> <div> <label for="profile-name" class="block text-sm font-medium text-on-surface mb-2">
What should I call you? <span class="text-error">*</span> </label> <input type="text" id="profile-name" placeholder="Your preferred name..." class="journal-form-input w-full" maxlength="50" required> </div> <div> <label for="profile-communication" class="block text-sm font-medium text-on-surface mb-2">
How should I communicate with you?
</label> <input type="text" id="profile-communication" placeholder="e.g., supportive and encouraging, direct, gentle..." class="journal-form-input w-full" maxlength="100"> </div> </div> </div> <!-- Goals & Focus Group --> <div class="setting-group"> <h4 class="setting-title"> <svg class="w-5 h-5 inline mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path> </svg>
Current Focus
</h4> <p class="setting-description">What you're working on and why you're here</p> <div class="space-y-4 mt-4"> <div> <label for="profile-goals" class="block text-sm font-medium text-on-surface mb-2">
What would you like to work on?
</label> <textarea id="profile-goals" rows="2" placeholder="e.g., managing anxiety, building confidence, better sleep, stress management..." class="journal-form-textarea w-full" maxlength="300"></textarea> </div> <div> <label for="profile-challenges" class="block text-sm font-medium text-on-surface mb-2">
What brings you here?
</label> <textarea id="profile-challenges" rows="2" placeholder="What would you like support with?" class="journal-form-textarea w-full" maxlength="300"></textarea> </div> </div> </div> <!-- Preferences Group --> <div class="setting-group"> <h4 class="setting-title"> <svg class="w-5 h-5 inline mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path> </svg>
Your Preferences
</h4> <p class="setting-description">Help me understand what works best for you</p> <div class="space-y-4 mt-4"> <div> <label for="profile-coping" class="block text-sm font-medium text-on-surface mb-2">
What helps you feel better?
</label> <textarea id="profile-coping" rows="2" placeholder="e.g., deep breathing, music, nature walks, meditation..." class="journal-form-textarea w-full" maxlength="200"></textarea> </div> <div> <label for="profile-notes" class="block text-sm font-medium text-on-surface mb-2">
Anything else I should know?
</label> <textarea id="profile-notes" rows="2" placeholder="Optional notes about preferences, triggers to avoid, etc..." class="journal-form-textarea w-full" maxlength="200"></textarea> </div> </div> </div> </div> </div> </div> ${renderScript($$result, "/workspaces/smileyapp/src/components/panels/ProfilePanel.astro?astro&type=script&index=0&lang.ts")}`;
}, "/workspaces/smileyapp/src/components/panels/ProfilePanel.astro", void 0);

const $$SecuritySettings = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<!-- Data Encryption -->${maybeRenderHead()}<div class="setting-group"> <h4 class="setting-title">Data Encryption</h4> <div class="material-switch"> <input type="checkbox" id="encryption-enabled"> <div class="switch-track"> <div class="switch-thumb"></div> </div> <label for="encryption-enabled" class="switch-label">Enable local data encryption</label> </div> <p class="setting-description">Encrypt your chat history and settings with a password</p> </div> <!-- Auto-Lock Timer --> <div class="setting-group"> <h4 class="setting-title">Auto-Lock Timer</h4> <div class="custom-select-wrapper"> <select id="auto-lock-select" class="custom-select"> <option value="0">Never</option> <option value="5">5 minutes</option> <option value="15">15 minutes</option> <option value="30" selected>30 minutes</option> <option value="60">1 hour</option> <option value="120">2 hours</option> </select> <svg class="select-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path> </svg> </div> <p class="setting-description">Automatically lock encrypted data after inactivity</p> </div> <!-- Password Management --> <div class="setting-group"> <h4 class="setting-title">Password Management</h4> <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;"> <button id="set-password-btn" class="btn-outlined"> <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path> </svg>
Set Password
</button> <button id="change-password-btn" class="btn-outlined" style="display: none;"> <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path> </svg>
Change Password
</button> <button id="test-unlock-btn" class="btn-outlined" style="display: none;"> <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path> </svg>
Test Unlock
</button> </div> <p class="setting-description">Manage your encryption password and test access</p> </div> <!-- Security Details --> <div class="setting-group"> <h4 class="setting-title">Security Details</h4> <div style="padding: 0.75rem; background: hsl(var(--surface-variant) / 0.3); border-radius: 0.5rem; font-family: ui-monospace, 'SF Mono', Consolas, monospace; font-size: 0.875rem; color: hsl(var(--on-surface-variant));">
AES-256-GCM • PBKDF2 • Client-side only
</div> <p class="setting-description">Industry-standard encryption processed locally in your browser</p> </div> <!-- Password Setup Modal --> <div id="password-setup-modal" class="confirm-modal hidden"> <div class="confirm-modal-backdrop"></div> <div class="confirm-modal-container"> <div class="confirm-modal-content"> <div class="confirm-modal-header"> <div class="confirm-modal-icon"> <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path> </svg> </div> <div class="confirm-modal-text"> <h3 class="confirm-modal-title">Set Encryption Password</h3> <p class="confirm-modal-description">Create a secure password to encrypt your data</p> </div> </div> <div class="confirm-modal-body"> <div class="password-form"> <div class="form-field"> <label for="new-password">Password</label> <input type="password" id="new-password" class="form-input" placeholder="Enter your password"> </div> <div class="form-field"> <label for="confirm-password">Confirm Password</label> <input type="password" id="confirm-password" class="form-input" placeholder="Confirm your password"> </div> </div> </div> <div class="confirm-modal-actions"> <button class="btn-outlined" onclick="closePasswordModal()">Cancel</button> <button class="btn-primary" onclick="savePassword()">Set Password</button> </div> </div> </div> </div>`;
}, "/workspaces/smileyapp/src/components/SecuritySettings.astro", void 0);

const $$SettingsPanel = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="panel-settings" class="flex-1 flex flex-col hidden app-panel"> <div class="p-6 max-w-4xl mx-auto w-full"> <!-- Panel Header --> <div class="panel-section-header"> <div class="header-left-section"> <div class="section-title"> <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path> </svg>
Settings
</div> </div> </div> <!-- Panel Description --> <div class="mb-6"> <p class="text-on-surface-variant text-sm">Customize your AI experience, appearance, and privacy preferences</p> </div> <!-- Settings Tabs --> <div class="settings-tabs mb-8"> <div class="tabs-nav"> <button class="tab-button active" data-tab="ai"> <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path> </svg>
AI & Chat
</button> <button class="tab-button" data-tab="appearance"> <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"></path> </svg>
Appearance
</button> <button class="tab-button" data-tab="privacy"> <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path> </svg>
Privacy
</button> <button class="tab-button" data-tab="security"> <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path> </svg>
Security
</button> </div> </div> <!-- AI & Conversation Tab --> <div class="tab-content active" data-tab-content="ai"> <div class="space-y-6"> <div class="setting-group"> <h4 class="setting-title">AI Model</h4> <div class="custom-select-wrapper"> <select id="model-select" class="custom-select"> <option>Loading models...</option> </select> <svg class="select-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path> </svg> </div> <p class="setting-description">Choose which AI model to use for conversations</p> </div> <div class="setting-group"> <h4 class="setting-title">Response Style</h4> <div class="custom-select-wrapper"> <select id="response-style" class="custom-select"> <option value="supportive">Supportive & Encouraging</option> <option value="professional">Professional & Clinical</option> <option value="casual">Casual & Friendly</option> <option value="empathetic">Deeply Empathetic</option> </select> <svg class="select-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path> </svg> </div> <p class="setting-description">Set the tone for AI responses</p> </div> <div class="setting-group"> <h4 class="setting-title">Voice Responses</h4> <div class="material-switch"> <input type="checkbox" id="tts-enabled"> <div class="switch-track"> <div class="switch-thumb"></div> </div> <label for="tts-enabled" class="switch-label">Enable text-to-speech responses</label> </div> <p class="setting-description">Hear AI responses spoken aloud</p> </div> </div> </div> <!-- Appearance Tab --> <div class="tab-content" data-tab-content="appearance"> <div class="space-y-8"> <div class="setting-group"> <h4 class="setting-title">Display Mode</h4> <div class="custom-select-wrapper"> <select id="theme-mode-select" class="custom-select"> <option value="auto">Auto (Follow System)</option> <option value="light">Light Mode</option> <option value="dark">Dark Mode</option> </select> <svg class="select-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path> </svg> </div> <p class="setting-description">Choose between light, dark, or automatic theme</p> </div> <div class="setting-group"> <h4 class="setting-title">Accent Color</h4> <div class="color-theme-grid"> <button class="color-theme-card active" data-theme="smile"> <div class="color-preview" style="background: linear-gradient(135deg, #3b82f6, #1d4ed8);"></div> <span>Ocean Blue</span> </button> <button class="color-theme-card" data-theme="forest"> <div class="color-preview" style="background: linear-gradient(135deg, #10b981, #059669);"></div> <span>Forest Green</span> </button> <button class="color-theme-card" data-theme="sunset"> <div class="color-preview" style="background: linear-gradient(135deg, #f59e0b, #d97706);"></div> <span>Sunset Orange</span> </button> <button class="color-theme-card" data-theme="lavender"> <div class="color-preview" style="background: linear-gradient(135deg, #8b5cf6, #7c3aed);"></div> <span>Lavender Purple</span> </button> </div> <p class="setting-description">Choose your preferred accent color</p> </div> </div> </div> <!-- Privacy Tab --> <div class="tab-content" data-tab-content="privacy"> <div class="space-y-6"> <div class="setting-group"> <h4 class="setting-title">Clear All Data</h4> <button id="clear-data-btn" class="btn-outlined"> <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path> </svg>
Clear All Data
</button> <p class="setting-description">Remove all chat history and preferences from local storage</p> </div> </div> </div> <!-- Security Settings --> <div class="tab-content" data-tab-content="security"> <div class="space-y-6"> <!-- Import Security Settings Component --> ${renderComponent($$result, "SecuritySettings", $$SecuritySettings, {})} </div> </div> </div> </div>`;
}, "/workspaces/smileyapp/src/components/panels/SettingsPanel.astro", void 0);

const $$PanelContainer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<!-- Main panel -->${maybeRenderHead()}<main class="flex-1 flex flex-col min-h-screen"> ${renderComponent($$result, "ChatPanel", $$ChatPanel, {})} ${renderComponent($$result, "MemoriesPanel", $$MemoriesPanel, {})} ${renderComponent($$result, "HistoryPanel", $$HistoryPanel, {})} ${renderComponent($$result, "JournalPanel", $$JournalPanel, {})} ${renderComponent($$result, "ExercisesPanel", $$ExercisesPanel, {})} ${renderComponent($$result, "ProfilePanel", $$ProfilePanel, {})} ${renderComponent($$result, "SettingsPanel", $$SettingsPanel, {})} </main>`;
}, "/workspaces/smileyapp/src/components/panels/PanelContainer.astro", void 0);

const $$ConfirmModal = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<!-- Confirmation Modal for Delete Actions -->${maybeRenderHead()}<div id="confirm-modal" class="confirm-modal hidden"> <div class="confirm-modal-backdrop"></div> <div class="confirm-modal-container"> <div class="confirm-modal-content"> <!-- Modal Header --> <div class="confirm-modal-header"> <div class="confirm-modal-icon"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path> </svg> </div> <div class="confirm-modal-text"> <h3 class="confirm-modal-title">Delete Item</h3> <p class="confirm-modal-message">This action cannot be undone. Are you sure you want to delete this item?</p> </div> </div> <!-- Modal Actions --> <div class="confirm-modal-actions"> <button id="confirm-cancel-btn" class="confirm-btn confirm-btn-secondary"> <span>Cancel</span> </button> <button id="confirm-delete-btn" class="confirm-btn confirm-btn-danger"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"></path> </svg> <span>Delete</span> </button> </div> </div> </div> </div> ${renderScript($$result, "/workspaces/smileyapp/src/components/ConfirmModal.astro?astro&type=script&index=0&lang.ts")}`;
}, "/workspaces/smileyapp/src/components/ConfirmModal.astro", void 0);

const $$JournalModal = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<!-- Journal Entry Modal -->${maybeRenderHead()}<div id="journal-modal" class="confirm-modal hidden" data-journal-modal> <div class="confirm-modal-backdrop"></div> <div class="confirm-modal-container"> <div class="confirm-modal-content journal-modal-content"> <!-- Modal Header --> <div class="confirm-modal-header"> <div class="confirm-modal-icon"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path> </svg> </div> <div class="confirm-modal-text"> <h3 id="journal-modal-title" class="confirm-modal-title">New Journal Entry</h3> <p class="confirm-modal-message">Capture your thoughts and reflections</p> </div> </div> <!-- Modal Body --> <div class="journal-modal-body"> <form id="journal-entry-form" class="journal-form"> <div class="journal-form-field"> <label for="journal-title" class="journal-form-label">Title</label> <input type="text" id="journal-title" name="journal-title" class="journal-form-input" placeholder="What's on your mind?" required> </div> <div class="journal-form-field"> <label for="journal-content" class="journal-form-label">Content</label> <textarea id="journal-content" name="journal-content" class="journal-form-textarea" placeholder="Start writing your thoughts..." rows="8" maxlength="2000" required></textarea> <div class="journal-char-counter"> <span id="journal-char-count" class="journal-char-text">0</span> / 2000
</div> </div> <div class="journal-form-row"> <div class="journal-form-field journal-form-field-half"> <label for="journal-mood" class="journal-form-label">Mood</label> <select id="journal-mood" name="journal-mood" class="journal-form-select"> <option value="😊">😊 Happy</option> <option value="😐">😐 Neutral</option> <option value="😔">😔 Sad</option> <option value="😤">😤 Frustrated</option> <option value="😎">😎 Confident</option> <option value="😴">😴 Tired</option> <option value="🤔">🤔 Thoughtful</option> <option value="😁">😁 Excited</option> </select> </div> <div class="journal-form-field journal-form-field-half"> <label for="journal-privacy" class="journal-form-label">Privacy</label> <select id="journal-privacy" name="journal-privacy" class="journal-form-select"> <option value="private">🔒 Private</option> <option value="shared">🌐 Shared</option> </select> </div> </div> </form> </div> <!-- Modal Actions --> <div class="confirm-modal-actions"> <button type="button" id="journal-save-draft" class="confirm-btn confirm-btn-secondary"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path> </svg> <span>Save Draft</span> </button> <button type="button" id="journal-cancel" class="confirm-btn confirm-btn-secondary"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path> </svg> <span>Cancel</span> </button> <button type="submit" id="journal-save" class="confirm-btn confirm-btn-primary"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> <span id="journal-save-text">Save Entry</span> </button> </div> </div> </div> </div> ${renderScript($$result, "/workspaces/smileyapp/src/components/JournalModal.astro?astro&type=script&index=0&lang.ts")}`;
}, "/workspaces/smileyapp/src/components/JournalModal.astro", void 0);

const $$SecurityUnlockModal = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`<!-- Security Unlock Modal -->${maybeRenderHead()}<div id="security-unlock-modal" class="confirm-modal hidden" data-astro-cid-qrcc5zbf> <div class="confirm-modal-backdrop" data-astro-cid-qrcc5zbf></div> <div class="confirm-modal-container" data-astro-cid-qrcc5zbf> <div class="confirm-modal-content security-modal-content" data-astro-cid-qrcc5zbf> <!-- Modal Header --> <div class="confirm-modal-header" data-astro-cid-qrcc5zbf> <div class="confirm-modal-icon" data-astro-cid-qrcc5zbf> <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-qrcc5zbf> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" data-astro-cid-qrcc5zbf></path> </svg> </div> <div class="confirm-modal-text" data-astro-cid-qrcc5zbf> <h3 class="confirm-modal-title" data-astro-cid-qrcc5zbf>Enter Password</h3> <p class="confirm-modal-message" data-astro-cid-qrcc5zbf>Your data is encrypted. Please enter your password to unlock.</p> </div> </div> <!-- Modal Body --> <div class="security-modal-body" data-astro-cid-qrcc5zbf> <form id="unlock-form" class="security-form" data-astro-cid-qrcc5zbf> <div class="form-field" data-astro-cid-qrcc5zbf> <label for="unlock-password" class="form-label" data-astro-cid-qrcc5zbf>Password</label> <div class="password-input-container" data-astro-cid-qrcc5zbf> <input type="password" id="unlock-password" name="password" class="form-input password-input" placeholder="Enter your password" required autocomplete="current-password" data-astro-cid-qrcc5zbf> <button type="button" class="password-toggle-btn" id="unlock-password-toggle" data-astro-cid-qrcc5zbf> <svg class="w-5 h-5 password-icon-hide" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-qrcc5zbf> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-astro-cid-qrcc5zbf></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-astro-cid-qrcc5zbf></path> </svg> <svg class="w-5 h-5 password-icon-show hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-qrcc5zbf> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" data-astro-cid-qrcc5zbf></path> </svg> </button> </div> <div id="unlock-error" class="form-error hidden" data-astro-cid-qrcc5zbf></div> </div> <div class="security-options" data-astro-cid-qrcc5zbf> <label class="security-checkbox" data-astro-cid-qrcc5zbf> <input type="checkbox" id="remember-session" data-astro-cid-qrcc5zbf> <span class="checkbox-mark" data-astro-cid-qrcc5zbf></span> <span class="checkbox-label" data-astro-cid-qrcc5zbf>Keep unlocked during this session</span> </label> </div> </form> </div> <!-- Modal Actions --> <div class="confirm-modal-actions" data-astro-cid-qrcc5zbf> <button type="button" id="unlock-cancel" class="confirm-btn confirm-btn-secondary" data-astro-cid-qrcc5zbf> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-qrcc5zbf> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-astro-cid-qrcc5zbf></path> </svg> <span data-astro-cid-qrcc5zbf>Cancel</span> </button> <button type="submit" id="unlock-submit" class="confirm-btn confirm-btn-primary" form="unlock-form" data-astro-cid-qrcc5zbf> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-qrcc5zbf> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" data-astro-cid-qrcc5zbf></path> </svg> <span data-astro-cid-qrcc5zbf>Unlock</span> </button> </div> </div> </div> </div>  ${renderScript($$result, "/workspaces/smileyapp/src/components/SecurityUnlockModal.astro?astro&type=script&index=0&lang.ts")}`;
}, "/workspaces/smileyapp/src/components/SecurityUnlockModal.astro", void 0);

const $$AppShell = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="app-shell" class="min-h-screen flex bg-surface"> <!-- Navigation Sidebar (Fixed) --> ${renderComponent($$result, "NavigationSidebar", $$NavigationSidebar, {})} <!-- Main content area with left margin for fixed sidebar --> <div class="flex-1 ml-20"> ${renderComponent($$result, "PanelContainer", $$PanelContainer, {})} </div> <!-- Global Confirmation Modal --> ${renderComponent($$result, "ConfirmModal", $$ConfirmModal, {})} <!-- Global Journal Modal --> ${renderComponent($$result, "JournalModal", $$JournalModal, {})} <!-- Global Security Unlock Modal --> ${renderComponent($$result, "SecurityUnlockModal", $$SecurityUnlockModal, {})} </div>`;
}, "/workspaces/smileyapp/src/components/AppShell.astro", void 0);

const $$OnboardingModal = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<!-- Onboarding Modal -->${maybeRenderHead()}<div id="onboarding-modal" class="modal-overlay"> <div class="modal-content"> <div class="modal-header"> <h3 class="modal-title">Welcome to Smile AI</h3> <p class="modal-subtitle">Let's set up your experience</p> </div> <div class="modal-body"> <div class="onboarding-step"> <h4 class="step-title">Choose your AI model</h4> <select id="onboarding-model-select" class="material-select"> <option>Loading available models...</option> </select> <p class="step-description">GPT-OSS 20B recommended for most conversations</p> </div> <div class="onboarding-step"> <h4 class="step-title">Select a theme</h4> <div class="theme-grid"> <button class="theme-card theme-card-active" data-theme="smile"> <div class="theme-preview bg-gradient-to-br from-blue-500 to-blue-600"></div> <span>Ocean Blue</span> </button> <button class="theme-card" data-theme="forest"> <div class="theme-preview bg-gradient-to-br from-green-500 to-green-600"></div> <span>Forest</span> </button> <button class="theme-card" data-theme="sunset"> <div class="theme-preview bg-gradient-to-br from-orange-500 to-red-500"></div> <span>Sunset</span> </button> <button class="theme-card" data-theme="lavender"> <div class="theme-preview bg-gradient-to-br from-purple-500 to-pink-500"></div> <span>Lavender</span> </button> </div> </div> <div class="onboarding-step"> <label class="material-switch"> <input id="onboarding-tts" type="checkbox"> <span class="switch-track"> <span class="switch-thumb"></span> </span> <span class="switch-label">Enable voice responses</span> </label> </div> <div class="privacy-notice"> <svg class="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24"> <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"></path> </svg> <div> <p class="notice-title">Privacy First</p> <p class="notice-text">Your conversations stay on your device. No data is sent to external servers.</p> </div> </div> </div> <div class="modal-actions"> <button id="onboarding-complete" class="btn-primary w-full">Get Started</button> </div> </div> </div>`;
}, "/workspaces/smileyapp/src/components/OnboardingModal.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AppShell", $$AppShell, {})} ${renderComponent($$result2, "OnboardingModal", $$OnboardingModal, {})} ` })} ${renderScript($$result, "/workspaces/smileyapp/src/pages/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/workspaces/smileyapp/src/pages/index.astro", void 0);

const $$file = "/workspaces/smileyapp/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
