import {loadEvents, loadConfig} from "../lib/data.js"
import FAQ from "../components/faq.js"
import Countdown from "../components/countdown"
import Hero from "../components/hero.js"
import Layout from "../components/layout.js"
import VenueMap from "../components/map.js"
import Teams from "../components/teams.js"
import ScheduleSection from '../components/scheduleSection.js';
import Resources from "../components/resources.js"
import Video from "../components/video.js"

export default function Index({ events, config }) {
  return (
    <Layout config={config}>
      <Hero config={config} />
      <ScheduleSection config={config} events={events} />
      <Video src="https://www.youtube.com/embed/M5q5llrXl5I" />
      <Countdown targetDate={`${config?.devent?.dateStart} 01:00`} className="mt-28 -mb-10"  />
      <VenueMap />
      <Resources config={config} />
      <Teams config={config} />
      <FAQ config={config} />
    </Layout>
  )
}

// This also gets called at build time
export async function getStaticProps() {
  return {
    props: {
      events: await loadEvents(),
      config: await loadConfig(),
    }
  }
}

