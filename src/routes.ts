import {Router} from 'lib/routes/router'

export const router = new Router({
  Home: '/',
  Search: '/search',
  Feeds: '/feeds',
  Notifications: '/notifications',
  Settings: '/settings',
  LanguageSettings: '/settings/language',
  Lists: '/lists',
  Moderation: '/moderation',
  ModerationModlists: '/moderation/modlists',
  ModerationMutedAccounts: '/moderation/muted-accounts',
  ModerationBlockedAccounts: '/moderation/blocked-accounts',
  Profile: ['/profile/:name', '/profile/:name/rss'],
  ProfileFollowers: '/profile/:name/followers',
  ProfileFollows: '/profile/:name/follows',
  ProfileList: '/profile/:name/lists/:rkey',
  PostThread: '/profile/:name/post/:rkey',
  PostLikedBy: '/profile/:name/post/:rkey/liked-by',
  PostRepostedBy: '/profile/:name/post/:rkey/reposted-by',
  ProfileFeed: '/profile/:name/feed/:rkey',
  ProfileFeedLikedBy: '/profile/:name/feed/:rkey/liked-by',
  ProfileLabelerLikedBy: '/profile/:name/labeler/liked-by',
  Debug: '/sys/debug',
  DebugMod: '/sys/debug-mod',
  Log: '/sys/log',
  AppPasswords: '/settings/app-passwords',
  PreferencesFollowingFeed: '/settings/following-feed',
  PreferencesThreads: '/settings/threads',
  PreferencesExternalEmbeds: '/settings/external-embeds',
  AccessibilitySettings: '/settings/accessibility',
  SavedFeeds: '/settings/saved-feeds',
  Support: '/support',
  PrivacyPolicy: '/support/privacy',
  TermsOfService: '/support/tos',
  CommunityGuidelines: '/support/community-guidelines',
  CopyrightPolicy: '/support/copyright',
  Hashtag: '/hashtag/:tag',
  Messages: '/messages',
  MessagesSettings: '/messages/settings',
  MessagesConversation: '/messages/:conversation',
  StarterPack: '/starter-pack/:id',
  StarterPackLanding: '/start/:id',
  StarterPackWizard: '/starter-pack/create',
})
