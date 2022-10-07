import { useState } from 'react';

export default function Map() {
  const [interactiveMap, setInteractiveMap] = useState(false);

  return (
    <div className="mt-48 w-full" onClick={() => setInteractiveMap(true)} onMouseLeave={() => setInteractiveMap(false)}>
      <iframe className={`w-full block relative ${interactiveMap ? 'pointer-events-auto' : 'pointer-events-none'}`} width="100%" height="700" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.google.com/maps/d/embed?mid=1Mi6wqs8btm1_ZXEF_43hK09RYFbAqRw&ehbc=2E312F"></iframe>
    </div>
  )
}
