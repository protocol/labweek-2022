import { useRef, useEffect } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'

import { ScheduleTable } from "./scheduletable.js"
import { AddEventModal } from "./event.js"
import Markdown from './markdown.js'
import annotateEvents from '../lib/annotateEvents.js'

export default function ScheduleSection({ events, config }) {
  const scrollContainer = useRef(null);

  useEffect(() => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollTo(780, 0);
    }
  });

  return (
    <article>
      <div className='w-full pt-28 pb-28 min-h-[10vh]' id='schedule'>
        <div className="container mx-auto max-w-6xl pb-10">
          <header className="flex flex-row">
            <h1 className="text-4xl font-bold">
              Schedule
            </h1>
            <a className="text-xs pl-4 self-end text-blue-600" href="/events.json">View as JSON</a>
          </header>
          <div className='mt-3'>
            <div className="mr-20 text-gray-400 float-right">
              Click &amp; Drag &rarr;
            </div>
            {config.schedule?.description && <Markdown>{config.schedule.description}</Markdown>}
          </div>
        </div>
        <ScrollContainer innerRef={scrollContainer} className="scroll-container">
          <div className="flex-none min-h-full w-full">
            <div className="content">
              <ScheduleTable events={annotateEvents(events, config)} config={config} />
            </div>
          </div>
        </ScrollContainer>
        <AddEventModal config={config} />
      </div>
    </article>
  )
}
