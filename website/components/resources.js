import { Accordion } from 'flowbite-react'
import Markdown from './markdown'


function slugify(s) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default function Resources({ config }) {
  const resources = (config.resources) || {}
  const title = "Attendee Resources"

  return (
    <div className={`w-full px-6 pb-20 pt-28 lg:px-20 lg:py-20 min-h-[10vh]`} id={ slugify(title) }>
      <div className='container max-w-6xl mx-auto bg-white rounded-lg lg:p-16'>
        
        <div className="w-full">
          <div className="container max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            <p className="text-xl mb-12">LabWeek22 is an open conference with dozens of independently hosted events. Attendees can choose which days to attend and arrange your own travel and accommodations. Below are some helpful resources as you plan our LabWeek22 adventure.</p>
            <Accordion>
              {Object.keys(resources).map((q, i) => (
                <Accordion.Panel open={true} key={i}>
                  <Accordion.Title arrowIcon={undefined}>
                    <Markdown children={q} />
                  </Accordion.Title>
                  <Accordion.Content>
                    <div className="mb-2 text-gray-500 dark:text-gray-400">
                      <Markdown children={resources[q]} />
                    </div>
                  </Accordion.Content>
                </Accordion.Panel>
              ))}
            </Accordion>
            <h1 className="text-3xl font-bold mb-4 mt-12">Event Host Resources</h1>
            <p>Thinking of hosting your own event? Have questions about the one you're currently planning?</p>
            <a
              href="https://coda.io/@stellarevents/labweek22/event-host-guide-25" type="button"
              className="inline-block px-5 py-3 mt-8 text-lg font-medium text-white bg-primary hover:bg-blue-400 px-8 py-3 rounded-lg rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            >
              Learn More here
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
