'use client'

import { useEffect } from 'react'
import useLocalStorageState from '../../../../lib/useLocalStorageState'
import { setTavernRsvpStatus, getTavernRsvpStatus } from '@/app/utils/tavern'
import { Card } from '@/components/ui/card'
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('./map'), {
  ssr: false,
})

const RsvpStatusSwitcher = () => {
  const [rsvpStatus, setRsvpStatus] = useLocalStorageState(
    'cache.rsvpStatus',
    'none',
  )

  useEffect(() => {
    // set rsvp status
    getTavernRsvpStatus().then((status) => setRsvpStatus(status))
  }, [])

  const onOptionChangeHandler = (e) => {
    setRsvpStatus(e.target.value)
    setTavernRsvpStatus(e.target.value)
  }

  return (
    <div className="text-center mb-6 mt-12" id="region-select">
      <label>Will you join?</label>
      <select
        onChange={onOptionChangeHandler}
        value={rsvpStatus}
        className="ml-2 text-gray-600 rounded-sm"
      >
        <option disabled>Select</option>
        <option value="none">Nope, can't do neither</option>
        <option value="organizer">I can organize a tavern near me</option>
        <option value="participant">I want to attend a tavern near me</option>
      </select>
    </div>
  )
}

export default function Tavern() {
  return (
    <div className="container mx-auto px-4 py-8 text-white relative">
      <div className="text-white">
        <h1 className="font-heading text-5xl mb-6 text-center relative w-fit mx-auto">
          Mystic Tavern
        </h1>
        <Card className="my-8 p-6">
          <p className="mb-4">
            On January 31st, thousands of ships will sail back to port,
            weathered and weary from their months-long voyage upon the High
            Seas. And yet, their journey—your journey—ends not at the dock… but
            in the firelit alcoves of the ✨Mystic Tavern✨.
          </p>
          <p className="mb-4">
            Join your fellow sailors to share tales and make merry over flagons
            of milk, to boast of your booty and exclaim the exploits of your
            greatest ships! Oh, and since most pirates don’t own cars, Hack
            Club’s{' '}
            <a href="#" target="_blank">
              gas fund
            </a>{' '}
            will cover your transportation.
          </p>
          <p className="mb-4">
            The tavern is not a single location, but a manifestation of pirate
            camaraderie known to appear wherever an intrepid sailor focuses
            their spirit.{' '}
            <strong>
              We need captains in every city to step up and make their local
              Mystic Tavern their final and most selfless ship.
            </strong>
          </p>
          <p className="mb-4">
            Should you wish to organize such a gathering of shipmates, here are
            some things that will be asked of you:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>Pick a date during the third week of February</li>
            <li>
              Find a local venue (coffee shop, restaurant, library, park,
              whatever)
            </li>
            <li>Manage signups and communications for pirates in your area</li>
            <li>Receive and distribute special shirts at the event</li>
            <li>Make it memorable for people!</li>
          </ul>
          <p className="mb-4">
            So RSVP today to meet your local hearties at a tavern near you.
            Better yet, volunteer to make one happen! Because like, Hack Club is
            made of real people. You should meet each other, you’re pretty cool
            😉
          </p>
        </Card>
        <RsvpStatusSwitcher />

        <Map />
      </div>
    </div>
  )
}
