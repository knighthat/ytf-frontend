import './header.css'

export default function Header() {
  return (
      <header>
        <div className={'pure-u-1-24 pure-u-xl-1-4'}></div>
        <div className={'pure-u-11-24 pure-u-xl-1-2 search-bar-alignment'}>
          <div className={'search-bar-container'}>
            <input id={'search-bar'} placeholder="Search"/>
            <hr/>
          </div>
        </div>
        <div className={'pure-u-1-2 pure-u-xl-1-4'}>
          <nav>
            <ul>
              <li>My website</li>
              <li>Theme</li>
              <li>Changelogs</li>
            </ul>
          </nav>
        </div>
      </header>
  )
}