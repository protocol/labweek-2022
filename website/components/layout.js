import Head from 'next/head'
import Header from './header.js'
import Footer from './footer.js'

export function Layout({ children, config }) {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-800">
      <Head>
        <title>{config.devent.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:site_name" content={config.devent.name} />
        <meta property="og:url" content={config.devent.siteUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={config.devent.name} />
        <meta property="og:description" content={config.devent.description} />
        {config.devent.socialImage &&
          <meta property="og:image" content={`${config.devent.siteUrl}${config.devent.socialImage}`} />
        }

        <BaseScript />
        <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v2.10.0/mapbox-gl.css' rel='stylesheet' />
        <link href="https://fonts.googleapis.com/css2?family=Exo:wght@600&display=swap" rel="stylesheet"></link>
        
        {/* Twitter conversion tracking base code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
            },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
            a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
            twq('config','o9811');`,
          }}
        />
      </Head>
      <Header config={config} />

      <div className="flex-none items-center min-h-full w-full">
        <main className="content">
            {children}
        </main>
      </div>

      <Footer config={config} />
    </div>
  )
}

export function Section({ title, className, children }) {
  className = className || ""
  return (
    <div className={`w-full p-6 lg:px-20 lg:py-10 min-h-[10vh] ${className}`} id={ slugify(title) }>
      <div className="container max-w-6xl mx-auto pb-10">
        <h1 className="text-3xl text-center font-bold">
          {title}
        </h1>
      </div>
      <div className="w-full">
        {children}
      </div>
    </div>
  )
}

const ipfsBaseScript = `
(function () {
  const { pathname } = window.location
  const ipfsMatch = /.*\\/\\w{40,100}\\//.exec(pathname)
  const base = document.createElement('base')

  base.href = ipfsMatch ? ipfsMatch[0] : '/'
  document.head.append(base)
})();
`

export function BaseScript() {
  return (
    <script dangerouslySetInnerHTML={{__html: ipfsBaseScript}} />
  )
}

function slugify(s) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default Layout
