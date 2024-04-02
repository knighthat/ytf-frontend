import './landing.css'
import PopularFeed from "./PopularFeed";

export default function Landing() {
  return (
      <div className={'content-alignment'}>
        <PopularFeed/>
        {/*<div className={'feed-tabs-container'}>*/}
        {/*  <div id='popular-feed'>*/}
        {/*    <input type='radio' name='feed-tab-switcher' id='popular-tab' className={'feed-tab-switch'}/>*/}
        {/*    <label htmlFor='popular-tab' className={'feed-tab-label'}>Popular</label>*/}
        {/*    <div className={'feed-content'}>*/}
        {/*      */}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <div id='trending-feed'>*/}
        {/*    <input type='radio' name='feed-tab-switcher' defaultChecked id='trending-tab' className={'feed-tab-switch'}/>*/}
        {/*    <label htmlFor='trending-tab' className={'feed-tab-label'}>Trending</label>*/}
        {/*    <div className={'feed-content'}>*/}
        {/*      When I left Mr. Bates, I went down to my father: where, by the assistance of him and my uncle John, and some other relations, I got forty pounds, and a promise of thirty pounds a year to*/}
        {/*      maintain me at Leyden: there I studied physic two years and seven months, knowing it would be useful in long voyages.*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
  )
}