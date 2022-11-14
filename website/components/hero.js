import dayjs from 'dayjs'
import Markdown from './markdown'
import Button from './button'

const Lockup = (props) => {
  return (
    <div className='lg:flex'>
      <div className='flex-none mt-4 w-16 h-16 lg:w-24 lg:h-24 '>
        <img src={props.logo} width="1600" />
      </div>
      <div className='flex-grow text-left lg:ml-6'>
        <div className="mt-4 font-bold text-black mb-2 text-6xl">
          {props.name}
        </div>
        <div className="text-lg text-black lg:mt-2 font-bold">
          {props.tagline}
        </div>
      </div>
    </div>
  )
}

export default function Hero({ config }) {
  return (
    <div className="relative text-gray-300 w-full px-6 lg:px-10 min-h-[70vh] lg:flex lg:items-center">
      <div className="container max-w-6xl mx-auto lg:h-full">
        <div className="absolute inset-0 overflow-hidden">
          <img className="absolute bottom-0 left-1/2 transform -translate-x-1/4" src={config.devent.bgimg} style={{ minWidth: "1600px" }} />
        </div>
        <div className="relative w-full pt-10 pb-28 lg:pt-20">
          <div className="relative z-1 mx-auto min-h-full lg:ml-0 flex flex-col gap-y-3">
            <Lockup name={config.devent.name} logo={config.devent.logo} tagline={config.devent.tagline} />
            <div className='basis-1/3 my-5'>
              <div className="text-2xl text-black">
                {dateRangeStr(config.devent.dateStart, config.devent.dateEnd)}{config.devent.location && ` • ${config.devent.location}`}
              </div>
              <div className="text-md text-black leading-7 lg:max-w-xl w-half pr-20 lg:pr-0">
                <Markdown >{config.devent.description}</Markdown>
              </div>

              {config.devent.rsvpLink &&
                <div className="space-x-5 mb-10">
                  <Button href={config.devent.rsvpLink} className="mt-8" target="_blank">Register</Button>
                </div>}
              {config.devent.recapLink &&
                <div className="space-x-5 mb-10">
                  <a
                    href={config.devent.recapLink}
                    type="button"
                    className="inline-block px-5 py-3 mt-8 text-lg font-medium text-white bg-primary hover:bg-blue-400 px-8 py-3 rounded-lg rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  >
                    Recap Video
                  </a>
                </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function dateRangeStr(startDate, endDate) {
  const start = dayjs(startDate)
  const end = dayjs(endDate)
  if (dayjs(start).year() != dayjs(end).year()) {
    return start.format('YYYY MMMM D - ') + end.format('YYYY MMMM D')
  } else if (dayjs(start).month() != dayjs(end).month()) {
    return start.format('YYYY MMMM D - ') + end.format('MMMM D')
  } else {
    return start.format('YYYY MMMM D - ') + end.format('D')
  }
}
