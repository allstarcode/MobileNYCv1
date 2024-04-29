import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createEffect } from 'solid-js';
import './App.css';

type LocID = `#p${number}`;

function App() {
  gsap.registerPlugin(ScrollTrigger);

  // console.log(LocationData);
  // const markerURL = 'https://i.imgur.com/cGQh8J8.png';
  // const markerImgEle = document.createElement('img')
  // markerImgEle.src = markerURL;
  const parser = new DOMParser();
  const pinSVGStr =
    '<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg width="96" height="96" viewBox="0 0 63 63" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><g><path d="M31.25,59.017c0,0 -2.164,-10.326 -6.307,-21.261c-2.776,-7.325 -8.093,-14.923 -8.093,-19.873c0,-7.948 6.453,-14.4 14.4,-14.4c7.947,-0 14.4,6.452 14.4,14.4c-0,4.957 -5.324,12.571 -8.105,19.906c-4.141,10.923 -6.295,21.228 -6.295,21.228Z" style="fill:#ff4539;"/><path d="M33.534,19.17l0.067,-0.201l5.487,-0.623l3.848,-1.252l-1.513,-4.668l-3.848,1.252l-4.808,2.726l-0.17,-0.124l1.104,-5.42l-0,-4.052l-4.902,0l0,4.052l1.104,5.42l-0.169,0.124l-4.808,-2.726l-3.847,-1.252l-1.515,4.668l3.849,1.252l5.486,0.623l0.067,0.201l-4.076,3.735l-2.376,3.277l3.965,2.885l2.379,-3.277l2.287,-5.036l0.211,0l2.286,5.036l2.38,3.277l3.964,-2.885l-2.376,-3.277l-4.076,-3.735Z" style="fill:#101820;fill-rule:nonzero;"/></g></svg>';
  const allMarkers: google.maps.marker.AdvancedMarkerElement[] = [];
  // const progress = (<progress value="0" max="100"></progress>) as unknown as HTMLProgressElement;

  // const isMap = (m: any): m is google.maps.Map => {
  //   return m instanceof google.maps.Map;
  // };
  const isLatLng = (l: any): l is google.maps.LatLng => {
    return l instanceof google.maps.LatLng;
  };

  const panToLoc = (m: google.maps.Map, l: google.maps.LatLng) => {
    m.panTo(l);
  };
  // const onScroller = (e: Event) => {
  //   if (!e.target) return;
  //   const target = e.target as unknown as HTMLElement;
  //   const st = target.scrollTop;
  //   const sh = target.scrollHeight;
  //   const percent = (st / (sh - target.clientHeight)) * 100;
  //   progress.value = percent;
  // };

  // const addMarker = (m: google.maps.Map, lat: number, lng: number, title?: string) => {};

  createEffect(async () => {
    //? Map stuffs
    let map: google.maps.Map;
    const sections: HTMLElement[] = gsap.utils.toArray('.panel');
    console.log(sections);

    const { LatLng } = (await google.maps.importLibrary('core')) as google.maps.CoreLibrary;
    const { InfoWindow } = (await google.maps.importLibrary(
      'maps'
    )) as google.maps.StreetViewLibrary;

    // const offset = -0.025;
    const LocationData: Record<
      LocID,
      {
        name: string;
        lat: number;
        lng: number;
        coords: google.maps.LatLng;
        info?: google.maps.InfoWindow;
      }
    > = {
      '#p1': {
        name: 'TECHSPO New York Technology Expo',
        lat: 40.693875799313254,
        lng: -73.98852178739864,
        coords: new LatLng(40.693875799313254, -73.98852178739864),
        info: new InfoWindow({
          content:
            '<article>9:00am, Thursday, 9:00am, Thursday, May 16th, 2024<br />333 Adams St, Brooklyn, NY 11201 (NY Marriott Hotel at the Brooklyn Bridge)<br /><br /><p><br />- Two day technology expo May 16 – 17, 2024 at New York Marriott at the Brooklyn Bridge Hotel in New York City<br />- Brings together some of the best developers, brands, marketers, technology providers, designers, and innovators looking to set the pace in an advanced world of technology.<br />- Exhibitors showcase the next generation of advances in technology & innovation<br />- Learn how these evolving technologies will impact your business for greater growth.</p></article>',
        }),
      },
      '#p2': {
        name: 'International Conference on Cyber Security (ICCS 2025)',
        lat: 40.77116790008878,
        lng: -73.98517140459104,
        coords: new LatLng(40.77116790008878, -73.98517140459104),
        info: new InfoWindow({
          content:
            '<article>Sometime in 2025<br />113 W 60th St, New York, NY 10023<br /><br /<p>Topics covered:- Cyber Risks and International Investments- Cloud Native and Digital Transformation- Cyber Risks to Election Systems- Trojan Attack and Backdoors in Pervasive Artificial Intelligence Systems- Blockchain and Security- Cyber Prosecution and International Crossroads- Transforming Corporate Information Security</p></article>',
        }),
      },
      '#p3': {
        name: 'International Conference on Research in Science, Engineering and Technology',
        lat: 40.75950665756728,
        lng: -73.8325264278469,
        coords: new LatLng(40.75950665756728, -73.8325264278469),
        info: new InfoWindow({
          content:
            '<article>2024-05-17 to 2024-05-18<br />39-16 Prince St, Queens, NY 11354<br /><br /><p>International Conference on Research in Science, Engineering and Technology to bring together innovative academics and industrial experts in the field of Science, Engineering and Technology to a common forumhttps://wrfer.org/Conference/32425/ICRSET/</p></article>',
        }),
      },
      '#p4': {
        name: 'Spyscape',
        lat: 40.765424063874526,
        lng: -73.98359815668267,
        coords: new LatLng(40.765424063874526, -73.98359815668267),
        info: new InfoWindow({
          content:
            '<article>Always<br />928 8th Ave, New York, NY 10019<br /><br /><p>Explore hidden worlds, break codes, run surveillance and spot liars while a system developed with MI6 experts reveals your personal spy role and profile. You’ll jump, climb, throw and dodge in fun immersive challenges developed with CIA experts to stretch your physical and mental agility with each visit.</p></article>',
        }),
      },
      '#p5': {
        name: 'South Street Seaport Museum and its collection',
        lat: 40.70674760157036,
        lng: -74.00346485483267,
        coords: new LatLng(40.70674760157036, -74.00346485483267),
        info: new InfoWindow({
          content:
            '<article>Always<br />12 Fulton St, New York, NY 10038<br /><br /><p>Holds significant historical value in the neighboring Financial District and is home to some of the oldest buildings in Downtown Manhattan, including a large collection of early 19th-century commercial buildings.</p></article>',
        }),
      },
      '#p6': {
        name: 'VR World',
        lat: 40.748350947997984,
        lng: -73.98384542817237,
        coords: new LatLng(40.748350947997984, -73.98384542817237),
        info: new InfoWindow({
          content:
            "<article>Always<br />8 E 34th St, New York, NY 10016<br /><br /><p>North America's largest mixed reality playground, with over 50 immersive VR experiences from art and film to gaming and multiplayer features.</p></article>",
        }),
      },
      '#p7': {
        name: 'The Rooftop at Pier 17',
        lat: 40.705624935951505,
        lng: -74.00168571806202,
        coords: new LatLng(40.705624935951505, -74.00168571806202),
        info: new InfoWindow({
          content:
            '<article><br />89 South St Pier 17, New York, NY 10038<br /><br /><p>Sunset views with outdoor concert experience</p></article>',
        }),
      },
      '#p8': {
        name: 'Javits Center New York International Auto Show',
        lat: 40.75760735955322,
        lng: -74.00225452599453,
        coords: new LatLng(40.75760735955322, -74.00225452599453),
        info: new InfoWindow({
          content:
            '<article><br />429 11th Ave, New York, NY 10001<br /><br /><p>Car cultureTech in automotive worldTech advancementsTech variations from across the world</p></article>',
        }),
      },
      '#p9': {
        name: 'Ninth Avenue International Food Festival',
        lat: 40.760155322980935,
        lng: -73.99047685535554,
        coords: new LatLng(40.760155322980935, -73.99047685535554),
        info: new InfoWindow({
          content:
            "<article>Saturday and Sunday | May 18 & 19, 202410am-6pm | 9th Avenue (42nd-57th Streets)<br />208A 630 Ninth Ave, New York, NY 10036<br /><br /><p>In Hell’s Kitchen, lined with an array of cuisines and beverages, for one of NYC’s oldest, largest food festivals.Mission of offering a variety of events and promotions related to the Merchants of Ninth Avenue and Hell's Kitchen in New York City</p></article>",
        }),
      },
      '#p10': {
        name: 'New York Comic-Con',
        lat: 40.75770488180689,
        lng: -74.00172881295774,
        coords: new LatLng(40.75770488180689, -74.00172881295774),
        info: new InfoWindow({
          content:
            '<article>October 17-20, 2024<br />429 11th Ave, New York, NY 10001<br /><br /><p>Fan convention dedicated to Western comics, graphic novels, anime, manga, video games, cosplay, toys, movies, and television. It was first held in 2006.North AMerica’s most attended convention</p></article>',
        }),
      },
      '#p11': {
        name: 'New York City Wine & Food Festival',
        lat: 40.64489444436253,
        lng: -74.02497271759074,
        coords: new LatLng(40.64489444436253, -74.02497271759074),
        info: new InfoWindow({
          content:
            "<article>October 17-20, 2024<br />80 58th St, Brooklyn, NY 11220<br /><br /><p>The New York City Wine & Food Festival takes place each October as a benefit for the Food Bank for NYC and Share Our Strength's No Child Hungry campaign.For four days, the calendar is packed with themed seminars, wine pairings, culinary demos, and other events, held at venues throughout the city and hosted by celebrity chefs from the Food Network and Cooking Channel.The largest and most popular are the walk around Grand Tasting events on Saturday and Sunday, where attendees visit tasting stations from hundreds of chefs from around the country, while mingling with celebrity chefs in the crowd</p></article>",
        }),
      },
      '#p12': {
        name: 'The Governors Ball Music Festival',
        lat: 40.78906845769038,
        lng: -73.92704499040248,
        coords: new LatLng(40.78906845769038, -73.92704499040248),
        info: new InfoWindow({
          content:
            '<article>Fri, Jun 7, 2024 – Sun, Jun 9, 2024<br />Randalls and Wards IslandsNew York, NY<br /><br /><p>Dramatically set in the middle of the East River on Randall’s Island just off of Manhattan3-day festival features a wide-ranging mix of bands that range from indie rock to hip-hopIn between sets, attendees can sample treats from New York’s best food trucks, try their luck with a lawn game or just take in the sweeping views of the city</p></article>',
        }),
      },
      '#p13': {
        name: 'The Armory Show',
        lat: 40.75770488180689,
        lng: -74.00172881295774,
        coords: new LatLng(40.75770488180689, -74.00172881295774),
        info: new InfoWindow({
          content:
            '<article>September 6–8, 2024<br />429 11th Ave, New York, NY 10001<br /><br /><p>A cornerstone of New York’s cultural landscape since its founding in 1994, The Armory Show brings the world’s leading international contemporary and modern art galleries to New York each yearThe fair plays a leading role in the city’s position as an important cultural capital through elevated presentations, thoughtful programming, curatorial leadership, meaningful institutional partnerships, and engaging public art activations</p></article>',
        }),
      },
      '#p14': {
        name: 'Global Conference on Human Resource Management',
        lat: 40.90003962352458,
        lng: -73.98663159630443,
        coords: new LatLng(40.90003962352458, -73.98663159630443),
        info: new InfoWindow({
          content:
            '<article>Friday, June 7, 2024 at 4:00 PM<br />31 West 34th Street, 7th & 8th Floors, New York, NY 10001<br /><br /><p>Extends a warm invitation to professionals and experts from a spectrum of fields, including academia, research, policymaking, human resource management, and labor lawThe conference provides a platform for attendees to learn from each other, collaborate on research endeavors, and establish professional networks</p></article>',
        }),
      },
      '#p15': {
        name: 'Youth Marketing Strategy',
        lat: 40.66106084122166,
        lng: -74.00010146627211,
        coords: new LatLng(40.66106084122166, -74.00010146627211),
        info: new InfoWindow({
          content:
            "<article>2024 Date Passed<br />153 26th St, Brooklyn, NY 11232<br /><br /><p>YMS NYC is America's largest youth marketing festival, focused on how brands can better understand and target the Gen Z market.Leading marketers from top brands and agencies share their most effective marketing strategies</p></article>",
        }),
      },
      '#p16': {
        name: 'UA3 Youth Empowerment Program & Young Shark Competition',
        lat: 40.72389592931645,
        lng: -73.99239500266275,
        coords: new LatLng(40.72389592931645, -73.99239500266275),
        info: new InfoWindow({
          content:
            '<article>Multiple dates: https://www.eventbrite.com/e/ua3-youth-empowerment-program-young-shark-competition-tickets-818641216917<br />273 Bowery, Chinatown, New York, NY 10002<br /><br /><p>Provides high school aged and college school aged students with an understanding of emotional wellness and provide resources that will assist in expressing themselves and supporting their friends and coping mechanisms for dealing with stress and mental health difficulties as well as develop beneficial health habits.DYCD calls all youth aged 14 to 24 to apply for the Young Sharks Competition! Throughout the 14-week workshop starting in February, participants will have the unique opportunity to start their own business. The journey involves crafting a product design, developing a business plan, constructing a prototype, etc with step-by step guidance.This competition offers Teams the chance to win up to $2500 in seed funding for your innovative business idea</p></article>',
        }),
      },
      '#p17': {
        name: 'The Winter Show',
        lat: 40.767413210616034,
        lng: -73.9654635584796,
        coords: new LatLng(40.767413210616034, -73.9654635584796),
        info: new InfoWindow({
          content:
            '<article>Mainly every january<br />643 Park Ave, New York, NY 10065<br /><br /><p>Each winter, the most prestigious antiques show in America comes to the Park Avenue Armory. Formerly known as the Winter Antiques Show, it features a selection of pieces from ancient times through the art deco movement and beyond, and also serves as a benefit for the East Side House Settlement.</p></article>',
        }),
      },
      '#p18': {
        name: 'The Harlem Bazaar',
        lat: 40.8204446167838,
        lng: -73.95896570265869,
        coords: new LatLng(40.8204446167838, -73.95896570265869),
        info: new InfoWindow({
          content:
            '<article>Multiple dates: https://www.eventbrite.com/e/uptown-night-market-tickets-767640010937<br />701 W 133rd St New York, NY 10027<br /><br /><p>The market is a showcase of the best of Uptown’s food, art, and music scene in the great outdoorsFeatures a mixture of the city’s best creators, designers, inventors, artists, and visionaries, selling everything from unique clothing and hand-crafted jewelry to tasty bites and intriguing artwork</p></article>',
        }),
      },
      '#p19': {
        name: 'New York Transit Museum and its collection',
        lat: 40.69066762053103,
        lng: -73.99018045278099,
        coords: new LatLng(40.69066762053103, -73.99018045278099),
        info: new InfoWindow({
          content:
            "<article>Always open<br />99 Schermerhorn St, Brooklyn, NY 11201<br /><br /><p>Tells the story of the city's public transportation history, particularly emphasizing the NYC Subway and gives a front row seat to fascinating insight into the development and evolution of the city's subway system</p></article>",
        }),
      },
      '#p20': {
        name: 'Community Board Annual Youth Conference',
        lat: 40.63004099983973,
        lng: -73.96151776708476,
        coords: new LatLng(40.63004099983973, -73.96151776708476),
        info: new InfoWindow({
          content:
            '<article>2025https://www.cb14youthconference.nyc/<br />810 East 16th Street Brooklyn, New York 11230<br /><br /><p>The conference is an excellent opportunity for people ages 14-21 to make valuable connections for the summer and beyond. Every year, approximately 50 New York City agencies, businesses and community organizations provide Youth Conference attendees with information about jobs, internships, career readiness, afterschool programs, college admissions and more!Attendees can apply for positions and programs on the spot. They will also be able to build their skills by participating in mock interviews with Brooklyn VIPs.</p></article>',
        }),
      },
      '#p21': {
        name: 'Museum of the Moving Image',
        lat: 40.75645914961474,
        lng: -73.92387450080734,
        coords: new LatLng(40.75645914961474, -73.92387450080734),
        info: new InfoWindow({
          content:
            '<article>Always open<br />36-01 35th Ave, Queens, NY 11106<br /><br /><p>Interactive museum experience where visitors make their own digital clips, produce, present and star in their own movies, shorts and TV shows</p></article>',
        }),
      },
      '#p22': {
        name: 'Forest Hills Stadium',
        lat: 40.71969913667436,
        lng: -73.84973904802793,
        coords: new LatLng(40.71969913667436, -73.84973904802793),
        info: new InfoWindow({
          content:
            '<article>Event based<br />1 Tennis Pl, Forest Hills, NY 11375<br /><br /><p>Strictly live music hub; many in important names in th emusic industry have performed here </p></article>',
        }),
      },
    };

    const numPanels = Object.values(LocationData).length;

    async function initMap(): Promise<void> {
      try {
        const { Map } = (await google.maps.importLibrary('maps')) as google.maps.MapsLibrary;
        const { AdvancedMarkerElement } = (await google.maps.importLibrary(
          'marker'
        )) as google.maps.MarkerLibrary;
        const center = {
          lat: 40.748817,
          lng: -73.985428,
        };

        map = new Map(document.getElementById('map') as HTMLElement, {
          center: { lat: center.lat, lng: center.lng },
          zoom: 13,
          mapId: crypto.randomUUID(),
        });

        for (let i = 1; i <= numPanels; i++) {
          const lID: LocID = `#p${i}`;
          const loc = LocationData[lID];
          // addMarker(map, loc.lat, loc.lng, loc.name);

          const pinSVG = parser.parseFromString(pinSVGStr, 'image/svg+xml').documentElement;

          const markerPayload = {
            map,
            position: { lat: loc.lat, lng: loc.lng },
            content: pinSVG,
            // title: loc.name,
          };

          console.log(markerPayload);

          const M = new AdvancedMarkerElement(markerPayload);
          allMarkers.push(M);
        }
      } catch (e) {
        throw e;
      }
    }

    await initMap();

    console.log(allMarkers);

    const panelCont = document.getElementById('panelcont');
    console.log(panelCont);
    if (panelCont) {
      console.log('Panel cont');
      console.log(panelCont);
      function scrolling(e: WheelEvent) {
        const delta = e.deltaY;
        // console.log(e);
        // console.log(delta);
        if (panelCont) {
          panelCont.scrollBy(0, delta);
        }
        // if (!map) {
        //   console.warn('Map not found in scroller');
        //   return;
        // }
        // let current = map.getZoom();
        // if (!current) {
        //   console.warn('Unable to get current map zoom');
        //   return;
        // }
        // map.setZoom(current - 0.1);
      }
      window.addEventListener('wheel', scrolling);
      // panelCont.addEventListener(\'scroll', () => {
      //   console.log(panelCont);
      //   const st = panelCont.scrollTop;
      //   const sh = panelCont.scrollHeight;
      //   const percent = (st / (sh - panelCont.clientHeight)) * 100;
      //   progress.value = percent;
      // });
    }

    // const testLoc = new google.maps.LatLng(40.74736, -73.85179);

    // setTimeout(() => {
    //   console.log('Panning to test location...');
    //   map.panTo(testLoc);
    // }, 3000);

    // for (const id in LocationData) {
    //   const loc: LocID = LocationData[id];
    //   console.log(loc);
    //   // addMarker(map, loc.coo);
    // }

    // const tops = sections.map((section) =>
    //   ScrollTrigger.create({
    //     trigger: section,
    //     start: 'top top',
    //     scroller: '#panelcont',
    //     markers: true,
    //   })
    // );

    const calcpn = (c: number): { p?: LocID; c: LocID; n?: LocID } => {
      if (c === 0 || c === 1) {
        return {
          c: `#p${c}`,
          n: `#p${c + 1}`,
        };
      } else if (c === numPanels) {
        return {
          p: `#p${c - 1}`,
          c: `#p${c}`,
        };
      } else {
        return {
          p: `#p${c - 1}`,
          c: `#p${c}`,
          n: `#p${c + 1}`,
        };
      }
    };

    const tl = gsap.timeline();
    let tracker = 0;

    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        scroller: '#panelcont',
        start: 'top',
        end: 'bottom',
        // start: () => (section.offsetHeight < window.innerHeight ? 'top top' : 'bottom bottom'),
        // markers: true,
        // scrub: true,
        // pin: true,
        // pin: '.panel',
        // pinReparent: true,
        // pinSpacing: false,
        // snap: 0.25,
        onEnter: () => {
          tracker++;
          const target: LocID = `#p${tracker}`;

          if (target in LocationData) {
            const tLoc = LocationData[target];
            const coordinates = tLoc.coords;
            if (isLatLng(coordinates)) {
              panToLoc(map, coordinates);
            }
            if ('info' in tLoc && tLoc.info) {
              tLoc.info.open({
                anchor: allMarkers[tracker - 1],
              });
            }
          }
          // console.log(`Just entered panel #${tracker}`);
          const pcn = calcpn(tracker);
          // console.log(pcn);
          if (pcn.p) {
            const p = LocationData[pcn.p];
            if ('info' in p && p.info) {
              p.info.close();
            }
            if (tracker % 2 === 0) {
              tl.to(pcn.p, { opacity: 0, x: 100 });
            } else {
              tl.to(pcn.p, { opacity: 0, x: -100 });
            }
          }
          tl.to(pcn.c, { opacity: 1, x: 0 });
        },
        onLeaveBack: () => {
          tracker--;
          const target: LocID = `#p${tracker}`;
          if (target in LocationData) {
            const tLoc = LocationData[target];
            const coordinates = tLoc.coords;
            if (isLatLng(coordinates)) {
              panToLoc(map, coordinates);
            }
          }
          // console.log(`Just scrolled back to panel #${tracker}`);
          const pcn = calcpn(tracker);
          if (pcn.n) {
            const n = LocationData[pcn.n];
            if ('info' in n && n.info) {
              n.info.close();
            }

            if (tracker % 2 === 0) {
              tl.to(pcn.n, { opacity: 0, x: 100 });
            } else {
              tl.to(pcn.n, { opacity: 0, x: -100 });
            }
          }
          tl.to(pcn.c, { opacity: 1, x: 0 });
        },
      });
    });

    // ScrollTrigger.create({
    //   scroller: '#panelcont',
    //   markers: true,
    //   snap: {
    //     snapTo: (progress, self) => {
    //       const panelStarts = tops.map((st) => st.start);
    //       const snapScroll = gsap.utils.snap(panelStarts, self!.scroll());
    //       return gsap.utils.normalize(0, ScrollTrigger.maxScroll(window), snapScroll);
    //     },
    //   },
    // });
  });

  return (
    <>
      <main>
        <section id="locpanel" class="pico-background-zin-900">
          <div id="panelcont">
            <div id="wrapper">
              <div id="toppanelspacer" class="pico-background-zinc-800">
                Scroll Down Anywhere To Begin <br />
                🠋
              </div>
              <div id="p1" class="panel">
                <article class="pico-background-zinc-900">
                  <h3>TECHSPO New York Technology Expo</h3>
                </article>
              </div>
              <div id="p2" class="panel">
                <article class="pico-background-zinc-900">
                  <h3>International Conference on Cyber Security (ICCS 2025)</h3>
                </article>
              </div>
              <div id="p3" class="panel">
                <article class="pico-background-zinc-900">
                  <h3>
                    International Conference on Research in Science, Engineering and Technology
                  </h3>
                </article>
              </div>
              <div id="p4" class="panel">
                <article class="pico-background-zinc-900">
                  <h3>Spyscape</h3>
                </article>
              </div>
              <div id="p5" class="panel">
                <article class="pico-background-zinc-900">
                  <h3>South Street Seaport Museum and its collection</h3>
                </article>
              </div>
              <div id="p6" class="panel">
                <article class="pico-background-zinc-900">
                  <h3>VR World</h3>
                </article>
              </div>
              <div id="p7" class="panel">
                <article class="pico-background-zinc-900">
                  <h3>The Rooftop at Pier 17</h3>
                </article>
              </div>
              <div id="p8" class="panel">
                <article class="pico-background-zinc-900">
                  <h3>Javits Center New York International Auto Show</h3>
                </article>
              </div>
              <div id="p9" class="panel">
                <article class="pico-background-zinc-900">
                  <h3>Ninth Avenue International Food Festival</h3>
                </article>
              </div>
              <div id="p10" class="panel">
                <article class="pico-background-zinc-900">
                  <h3>New York Comic-Con</h3>
                </article>
              </div>
              <div id="p11" class="panel">
                <article class="pico-background-zinc-900">
                  <h3>New York City Wine & Food Festival</h3>
                </article>
              </div>
              <div id="p12" class="panel">
                <article class="pico-background-zinc-900">
                  <h3>The Governors Ball Music Festival</h3>
                </article>
              </div>
              <div id="p13" class="panel">
                <article class="pico-background-zinc-900">
                  <h3>The Armory Show</h3>
                </article>
              </div>
              <div id="p14" class="panel">
                <article class="pico-background-zinc-900">
                  <h3>Global Conference on Human Resource Management</h3>
                </article>
              </div>
              <div id="p15" class="panel">
                <article class="pico-background-zinc-900">
                  <h3>Youth Marketing Strategy</h3>
                </article>
              </div>
              <div id="p16" class="panel">
                <article class="pico-background-zinc-900">
                  <h3>UA3 Youth Empowerment Program & Young Shark Competition</h3>
                </article>
              </div>
              <div id="p17" class="panel">
                <article class="pico-background-zinc-900">
                  <h3>The Winter Show</h3>
                </article>
              </div>
              <div id="p18" class="panel">
                <article class="pico-background-zinc-900">
                  <h3>The Harlem Bazaar</h3>
                </article>
              </div>
              <div id="p19" class="panel">
                <article class="pico-background-zinc-900">
                  <h3>New York Transit Museum and its collection</h3>
                </article>
              </div>
              <div id="p20" class="panel">
                <article class="pico-background-zinc-900">
                  <h3>Brooklyn Community Board</h3>
                </article>
              </div>
              <div id="p21" class="panel">
                <article class="pico-background-zinc-900">
                  <h3>Community Board Annual Youth Conference</h3>
                </article>
              </div>
              <div id="p22" class="panel">
                <article class="pico-background-zinc-900">
                  <h3>Museum of the Moving Image</h3>
                </article>
              </div>
              <div id="p23" class="panel">
                <article class="pico-background-zinc-900">
                  <h3>Forest Hills Stadium</h3>
                </article>
              </div>
              {/* <div id="p1" class="panel">
                <article class="pico-background-zinc-900">

                  <small>
                    Bunch of info Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                  </small>
                  <footer>Details</footer>
                </article>
              </div>
              */}
              {/* <div id="p2" class="panel">
                <article class="pico-background-zinc-900">

                  <small>
                    Bunch of info Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                  </small>
                  <footer>Details</footer>
                </article>
              </div> */}
              {/* <div id="p3" class="panel">
                <article class="pico-background-zinc-900">

                  <small>
                    Bunch of info Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                  </small>
                  <footer>Details</footer>
                </article>
              </div> */}
              {/* <div id="p4" class="panel">
              4
              <div class="panelcontent">
                <h2>Some Location</h2>
                <p>Some information. </p>
              </div>
            </div>
            <div id="p5" class="panel">
              5
              <div class="panelcontent">
                <h2>Some Location</h2>
                <p>Some information. </p>
              </div>
              </div>
            <div id="p6" class="panel">
            6
              <div class="panelcontent">
              <h2>Some Location</h2>
                <p>Some information. </p>
              </div>
              </div>
            <div id="p7" class="panel">
              7
              <div class="panelcontent">
                <h2>Some Location</h2>
                <p>Some information. </p>
              </div>
            </div>
            <div id="p8" class="panel">
              8
              <div class="panelcontent">
              <h2>Some Location</h2>
              <p>Some information. </p>
              </div>
              </div>
              <div id="p9" class="panel">
              9
              <div class="panelcontent">
              <h2>Some Location</h2>
                <p>Some information. </p>
              </div>
            </div>
            <div id="p10" class="panel">
            10
            <div class="panelcontent">
            <h2>Some Location</h2>
            <p>Some information. </p>
            </div>
          </div> */}
              {/* <div id="bottompanelspacer"></div> */}
              {/* {progress} */}
            </div>
          </div>
        </section>
        <section id="map"></section>
      </main>
    </>
  );
}

export default App;
// import { createSignal } from \'solid-js'
// import solidLogo from './assets/solid.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = createSignal(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} class="logo" alt="Vite logo" />
//         </a>
//         <a href="https://solidjs.com" target="_blank">
//           <img src={solidLogo} class="logo solid" alt="Solid logo" />
//         </a>
//       </div>
//       <h1>Vite + Solid</h1>
//       <div class="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count()}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p class="read-the-docs">
//         Click on the Vite and Solid logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
