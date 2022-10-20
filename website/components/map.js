import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import Map, { Marker, Popup, NavigationControl, FullscreenControl, GeolocateControl } from 'react-map-gl';

const t = 'pk.eyJ1IjoicHJvdG9jb2wtbGFicyIsImEiOiJja214eHJocXQwYXI1Mnpwa2w4Zmg5cjVwIn0.TQW3j30h3EG8IA7E9w7mOg'
const dateLabels = {
  '10/24': 'Monday, Oct 24',
  '10/25': 'Tuesday, Oct 25',
  '10/26': 'Wednesday, Oct 26',
  '10/27': 'Thursday, Oct 27',
  '10/28': 'Friday, Oct 28',
  '10/29': 'Saturday, Oct 29',
  '10/30': 'Sunday, Oct 30',
  '10/31': 'Monday, Oct 31',
  '11/1': 'Tuesday, Nov 1',
  '11/2': 'Wednesday, Nov 2',
  '11/3': 'Thursday, Nov 3',
  '11/4': 'Friday, Nov 4',
}
const allDates = ['10/24', '10/25', '10/26', '10/27', '10/28', '10/29', '10/30', '10/31', '11/1', '11/2', '11/3', '11/4']
const allEvents = [
  { name: "CoD Summit²", longitude: -9.1459173, latitude: 38.7070745, dates:["11/2"]},
  { name: "CoD Summit²", longitude: -9.186751071, latitude: 38.69851087, dates:["11/3"]},
  { name: "Coinfeeds Demo + Social Hour", longitude: -9.131663342, latitude: 38.71132124, dates:["11/2"]},
  { name: "Consensus Lab Summit", longitude: -9.1459173, latitude: 38.7070745, dates:["10/26"]},
  { name: "CryptoEcon Day", longitude: -9.186751071, latitude: 38.69851087, dates:["11/1"]},
  { name: "Decentralized Job Fair @ IPFS Camp", longitude: -9.106202827, latitude: 38.73508553, dates:["10/29"]},
  { name: "Disco DeNites - LabWeek22 Closing Party", longitude: -9.107244458, latitude: 38.73040761, dates:["11/3"]},
  { name: "Drand LoE & Friends Summit", longitude: -9.148399013, latitude: 38.72774919, dates:["10/27"]},
  { name: "ETH Lisbon", longitude: -9.1499209, latitude: 38.7133453, dates:["10/28", "10/29", "10/30"]},
  { name: "FIL Lisbon Main Stage", longitude: -9.178862271, latitude: 38.70367791, dates:["10/31", "11/1"]},
  { name: "FIL X Fission X Lightshift Hacker Base", longitude: -9.1626885, latitude: 38.7041147, dates:["10/24","10/25","10/26","10/27","10/28","10/29","10/30","10/31","11/1","11/2","11/3","11/4"]},
  { name: "Filecoin Network Meetup", longitude: -9.143603613, latitude: 38.71354866, dates:["10/30"]},
  { name: "Filecoin Protocol Session", longitude: -9.106202827, latitude: 38.73508553, dates:["10/28"]},
  { name: "Filecoin Station @ Web Summit", longitude: -9.094018971, latitude: 38.76874033, dates:["11/2", "11/3", "11/4"]},
  { name: "Funding the Commons", longitude: -9.106202827, latitude: 38.73508553, dates:["10/26"]},
  { name: "Future of Web3 Video", longitude: -9.143603613, latitude: 38.71354866, dates:["11/2"]},
  { name: "FVM Hack Day", longitude: -9.1626885, latitude: 38.7041147, dates:["10/29"]},
  { name: "IPFS Camp", longitude: -9.106202827, latitude: 38.73508553, dates:["10/28", "10/29", "10/30"]},
  { name: "Lab Week Opening Party", longitude: -9.155071356, latitude: 38.72889193, dates:["10/24"]},
  { name: "Launchpad Social", longitude: -9.171936129, latitude: 38.70667265, dates:["10/26"]},
  { name: "libp2p Day", longitude: -9.106202827, latitude: 38.73508553, dates:["10/30"]},
  { name: "Lotus, Data Onboarding & Friends Summit", longitude: -9.186751071, latitude: 38.69851087, dates:["11/2"]},
  { name: "Lurk Day", longitude: -9.143681989, latitude: 38.71359181, dates:["10/28"]},
  { name: "Mona X ETH Lisbon", longitude: -9.1459173, latitude: 38.7070745, dates:["10/27"]},
  { name: "Open Metaverse meetup with Mona Galleries", longitude: -9.1626885, latitude: 38.7041147, dates:["10/25"]},
  { name: "Peer-to-peer networks meetup by Fluence", longitude: -9.178341087, latitude: 38.70070566, dates:["10/31"]},
  { name: "PL Summit", longitude: -9.106202827, latitude: 38.73508553, dates:["10/24"]},
  { name: "PL Working Sessions", longitude: -9.1347514, latitude: 38.71295326, dates:["10/26", "10/27", "10/28"]},
  { name: "PLN Founder Day", longitude: -9.1868113, latitude: 38.7036531, dates:["10/27"]},
  { name: "Retrieval Markets Summit", longitude: -9.186751071, latitude: 38.69851087, dates:["10/27"]},
  { name: "Sustainability, Social Impact, and Spirits", longitude: -9.1505303, latitude: 38.7200022, dates:["10/28"]},
  { name: "Talent Day @ Talent House Lisbon", longitude: -9.133694558, latitude: 38.71055314, dates:["10/27"]},
  { name: "The Filecoin Interplanetary Party", longitude: -9.131663342, latitude: 38.71132124, dates:["10/30"]},
  { name: "Web3 Adoption with MetaPals", longitude: -9.1459173, latitude: 38.7070745, dates:["10/30"]},
  { name: "Zama Party", longitude: -9.1579765, latitude: 38.70668709, dates:["10/27"]},
]
const allVenues = [
  { name: "Academia de Ciências de Lisboa", latitude: 38.7133453, longitude: -9.1499209, dates: ["10/28","10/29","10/30"], googleLink: "https://goo.gl/maps/mJrkWiq4fP11is8H6"},
  { name: "Altice Arena", latitude: 38.76874033, longitude: -9.094018971, dates: ["11/2","11/3","11/4"], googleLink: "https://goo.gl/maps/ZYuwQwdZC6ojBeaR7"},
  { name: "Broteria Cafe", latitude: 38.71359181, longitude: -9.143681989, dates: ["10/28"], googleLink: "https://goo.gl/maps/BTYadfHPD9UimKet8"},
  { name: "Broteria", latitude: 38.71354866, longitude: -9.143603613, dates: ["10/30","11/2"], googleLink: "https://goo.gl/maps/Un1j8y3LQVHf8TaL9"},
  { name: "Convento do Beato", latitude: 38.73508553, longitude: -9.106202827, dates: ["10/24","10/26","10/28","10/29","10/30"], googleLink: "https://goo.gl/maps/2yDdwVSHfgs1mYhL7"},
  { name: "EPIC SANA", latitude: 38.72774919, longitude: -9.148399013, dates: ["10/27"], googleLink: "https://g.page/EPICSANAMarquesHotel?share"},
  { name: "Estufa Fria", latitude: 38.72889193, longitude: -9.155071356, dates: ["10/24"], googleLink: "https://goo.gl/maps/YKZASeCakmiXPCgNA"},
  { name: "Flat Eventos Lisboa", latitude: 38.70668709, longitude: -9.1579765, dates: ["10/27"], googleLink: "https://goo.gl/maps/MZnTSSX7wZKjJSTq7"},
  { name: "Garagem Lisboa", latitude: 38.7041147, longitude: -9.1626885, dates: ["10/24","10/25","10/26","10/27","10/28","10/29","10/30","10/31","11/1","11/2","11/3","11/4"], googleLink: "https://goo.gl/maps/LB4TsVA1dkEjaKTo7"},
  { name: "Go a Lisboa", latitude: 38.70667265, longitude: -9.171936129, dates: ["10/26"], googleLink: "https://goo.gl/maps/JnGhbbfMcUSQY74U9"},
  { name: "Hub Criativo do Beato", latitude: 38.73040761, longitude: -9.107244458, dates: ["11/3"], googleLink: "https://g.page/HubCriativoBeato?share"},
  { name: "Hyatt Regency Lisbon", latitude: 38.69851087, longitude: -9.186751071, dates: ["10/27","11/1","11/2","11/3"], googleLink: "https://goo.gl/maps/ZmUX38Hm24fGANrD8"},
  { name: "Look Lisbon", latitude: 38.71055314, longitude: -9.133694558, dates: ["10/27"], googleLink: "https://goo.gl/maps/STWdJgfboaiaGpsD9"},
  { name: "LX Factory", latitude: 38.70367791, longitude: -9.178862271, dates: ["10/31","11/1"], googleLink: "https://goo.gl/maps/RqP3B78vFktLzbkRA"},
  { name: "Palacio de Tancos", latitude: 38.71295326, longitude: -9.1347514, dates: ["10/26","10/27","10/28"], googleLink: "https://goo.gl/maps/s8yCuy3x69RmVTno6"},
  { name: "Pestana Palace Lisboa", latitude: 38.7036531, longitude: -9.1868113, dates: ["10/27"], googleLink: "https://g.page/Pestana-Palace-Lisboa?share"},
  { name: "Suspenso", latitude: 38.71132124, longitude: -9.131663342, dates: ["10/30","11/2"], googleLink: "https://g.page/Suspenso_Lisboa?share"},
  { name: "The Vintage Hotel & Spa Lisboa", latitude: 38.7200022, longitude: -9.1505303, dates: ["10/28"], googleLink: "https://goo.gl/maps/uFVjoX14tvijqZPu9"},
  { name: "Time Out Market", latitude: 38.7070745, longitude: -9.1459173, dates: ["10/26","10/27","10/30","11/2"], googleLink: "https://g.page/timeoutmarketlisboa?share"},
  { name: "Village Underground Lisboa", latitude: 38.70070566, longitude: -9.178341087, dates: ["10/31"], googleLink: "https://g.page/villageundergroundlisboa?share"},
]

const areEqualArrays = (first, second) => {
  if (first.length !== second.length) {
    return false;
  };
  for (let i = 0; i < first.length; i++) {
    if (!second.includes(first[i])) {
      return false;
    };
  };
  return true;
};

const Pin = ({ size = 30 }) => {
  const style = {
    cursor: 'pointer',
    fill: '#3477f5',
    stroke: 'none'
  };
  return (
    <svg height={size} viewBox="0 0 24 24" style={style}>
      <path d="M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
    c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
    C20.1,15.8,20.2,15.8,20.2,15.7z"/>
    </svg>
  );
}

export default function VenueMap() {
  const [activeDates, setActiveDates] = useState(['10/24', '10/25', '10/26', '10/27', '10/28', '10/29', '10/30', '10/31', '11/1', '11/2', '11/3', '11/4'])
  const [activeVenues, setActiveVenues] = useState(allVenues)
  const [popupInfo, setPopupInfo] = useState(null);

  const switchDates = (date) => {
    if (areEqualArrays(activeDates, allDates)) {
      setActiveDates([date])
    } else if (activeDates.includes(date)) {
      setActiveDates([...activeDates].filter(item => item !== date))
    } else {
      setActiveDates([...activeDates, date])
    }
  }
  const showAllDates = () => {
    setActiveDates([...allDates])
  }

  useEffect(() => {
    const selectedVenue = popupInfo || null
    if(selectedVenue) {
      const dateFilteredEvents = [...allEvents].filter(event => {
        return activeDates.some(activeDate => {
          return event.dates.includes(`${activeDate}`)
        })
      })
      const venueFilteredEvents = [...dateFilteredEvents].filter(event => event.latitude === selectedVenue.latitude && event.longitude === selectedVenue.longitude)
      const annotatedEvents = [...venueFilteredEvents].map(event => {
        const startDate = event.dates[0]
        const endDate = event.dates[event.dates.length - 1]
        event.dateRange = startDate !== endDate ? `${startDate}-${endDate}` : startDate
        return event
      })
      const sortedEvents = [...annotatedEvents].sort((a, b) => a.dates[0] - b.dates[0]);
      selectedVenue.events = sortedEvents
      setPopupInfo(selectedVenue);
    }

    const filteredVenues = [...allVenues].filter(item => {
      return activeDates.some(r => item.dates.includes(r))
    })
    setActiveVenues(filteredVenues)
  }, [activeDates, popupInfo])

  const pins = useMemo(
    () =>
      activeVenues.map((venue, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={venue.longitude}
          latitude={venue.latitude}
          anchor="bottom"
          onClick={e => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(venue);
          }}
        >
          <Pin />
        </Marker>
      )),
    [activeVenues]
  );

  return (
    <div id="map" className={`mt-40 lg:px-6`}>
      <div className="relative mx-auto max-w-6xl lg:rounded-xl overflow-hidden">
        <Map
          initialViewState={{
            latitude: 38.7220166,
            longitude: -9.1699551,
            zoom: 12,
            scrollZoom: false,
            bearing: 0,
            pitch: 0,
            touchAction: 'pan-y',
          }}
          style={{ width: "100%", height: 600 }}
          mapStyle="mapbox://styles/mapbox/light-v9"
          mapboxAccessToken={t}
        >
          <GeolocateControl position="top-right" />
          <FullscreenControl position="top-right" />
          <NavigationControl position="top-right" />
          {pins}
          {popupInfo && (
            <Popup
              anchor="top"
              longitude={Number(popupInfo.longitude)}
              latitude={Number(popupInfo.latitude)}
              onClose={() => setPopupInfo(null)}
              style={{width: '360px'}}
              maxWidth='360px'
            >
              <div className="font-1 px-2 pb-2">
                <p className="font-bold text-base">{popupInfo.name}</p>
                <a className='outline-0 text-primary text-sm mt-4' href={popupInfo.googleLink} target="_blank">Google Maps</a>
              </div>
              <div className="font-1 pt-2 px-4 bg-gray-100 rounded">
                <h4 className="text-xs mb-2 font-bold text-gray-500">EVENTS</h4>
                <ul className="text-sm">
                {popupInfo.events &&
                  popupInfo.events.map(event => <li className="border-t border-gray-300 py-2 flex">
                    <div>
                      <span className="whitespace-nowrap inline-block border border-gray-300 font-bold text-xs tracking-widest py-0.5 px-1.5 rounded-full mr-2 min-w-12">{event.dateRange}</span>
                    </div>
                    <div>
                      {event.name}
                    </div>
                  </li>)
                }
                </ul>
              </div>
            </Popup>
          )}
        </Map>
        <div className='absolute left-0 top-0 bottom-0 w-80 p-8 hidden lg:block'>
          <div className='absolute inset-0 bg-blue-500 opacity-80'></div>
          <div className='relative z-20'>
            <div className="text-white text-sm font-bold font-1 flex flex-col gap-4">
              {allDates.map((date, index) => {
                return (
                  <div onClick={() => { switchDates(date) }} className="relative cursor-pointer" key={index}>
                    <div className={`${activeDates.includes(date) && 'bg-green-400'} absolute top-1/2 transform -translate-y-1/2 w-5 h-5 border border-white`} />
                    <span className="pl-8">{dateLabels[date]}</span>
                  </div>
                )
              })}
            </div>
            <button onClick={() => { showAllDates() }} className="bg-white text-blue-400 rounded w-full py-2 mt-8 font-1 font-bold">Show All Days</button>
          </div>
        </div>
      </div>
    </div>
  )
}
