/** @type {import('next').NextConfig} */
const nextConfig = () => ({
  output: process.env.NODE_ENV == 'development' ? undefined : 'export',
  rewrites: process.env.NODE_ENV == 'development' ? () => {
    const makeRoute = (pathname) => ({
        source: pathname,
        destination: `http://localhost:8080${pathname}`
    })
    return [
      makeRoute('/transaction/search'),
      makeRoute('/transaction/calculateBalance'),
    ]
  } : undefined,
})

module.exports = nextConfig
