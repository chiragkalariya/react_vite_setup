import reactLogo from './react.svg'

// Proxy returns a fallback icon path for any requested key to avoid missing assets during bundling.
const MainIcon = new Proxy({} as Record<string, string>, {
  get: () => reactLogo,
})

export default MainIcon
