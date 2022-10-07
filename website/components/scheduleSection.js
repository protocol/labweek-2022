import { useRef, useEffect } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import { BlankCard } from './event.js'

import { ScheduleTable } from "./scheduletable.js"
import { AddEventModal } from "./event.js"
import Markdown from './markdown.js'
import annotateEvents from '../lib/annotateEvents.js'

export default function ScheduleSection({ events, config }) {
  const scrollContainer = useRef(null);

  useEffect(() => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollTo(0, 0);
    }
  });

  return (
    <article>
      <div className='w-full pt-10 lg:pt-56 pb-28 min-h-[10vh]' id='schedule'>
        <div className="container mx-auto max-w-6xl pb-10 px-6 lg:px-0">
          <header className="flex flex-row">
            <h1 className="text-4xl font-bold">
              Schedule
            </h1>
            <a className="text-xs pl-4 self-end text-blue-600" href="/events.json">View as JSON</a>
          </header>
          <div className='mt-3'>
            {config.schedule?.description && <Markdown>{config.schedule.description}</Markdown>}
          </div>
        </div>
        <div className="bg-gray-100 py-10 pb-0 text-center">
          <img className="inline-block mr-3" src="/click-drag.svg" />
          Click and drag the schedule to navigate
        </div>
        <ScrollContainer innerRef={scrollContainer} className="scroll-container bg-gray-100 py-10">
          <div className="flex-none min-h-full w-full">
            <div className="content">
              <ScheduleTable events={annotateEvents(events, config)} config={config} />
            </div>
          </div>
        </ScrollContainer>
        <div className={`bg-gray-100 p-10 pt-0`}>
          <BlankCard />
        </div>
        <AddEventModal config={config} />
      </div>
    </article>
  )
}
