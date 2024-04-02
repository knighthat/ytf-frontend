import React, {useEffect, useState} from "react";
import {IonIcon} from "@ionic/react";

import './footer.css'

interface ListProps {
  icon: string;
  isIcon: boolean;
  text: string;
  alt?: string;
}

const MakeLi: React.FC<ListProps> = (props) => {
  return (
      <li>
        {props.isIcon
            ? <IonIcon size="large" name={props.icon}></IonIcon>
            : <img className={'section-list-icon'} src={'/icons/' + props.icon + '-32x32.png'} alt={props.alt}/>}
        <span>{props.text}</span>
      </li>
  )
}

class GithubVersion {
  hash: string;
  date: Date;

  constructor(hash: string, date: Date) {
    this.hash = hash;
    this.date = date;
  }

  toString(): string {
    return `${this.toDateString()}-${this.hash.substring(0, 7)}`
  }

  private toDateString(): string {
    const twoDigits = (num: number) => num < 10 ? `0${num}` : `${num}`;
    const year = this.date.getFullYear(), month = this.date.getMonth(), day = this.date.getDay();
    return `${year}.${twoDigits(month)}.${twoDigits(day)}`
  }
}

function GetVersion() {
  const url = 'https://api.github.com/repos/knighthat/ytf-frontend/commits?per_page=1';

  const [githubVersion, setGithubVersion] = useState<GithubVersion>();

  useEffect(() => {

    try {
      const getVersion = async () => {

        const request = await fetch(url);
        if (request.ok) {

          const data = (await request.json())[0];
          setGithubVersion(new GithubVersion(data.sha, new Date(data.commit.author.date)));
        }
      }
      getVersion();
    } catch (err) {
      console.log('Failed to fetch commit from URL: ' + url)
      console.log(err)
    }
  }, []);

  return (
      <span id={'project-version'} className={'pure-u-1 pure-u-lg-1-2'}>
      {githubVersion ? githubVersion.toString() : 'Getting version...'}
      </span>
  )
}

export default function Footer() {
  return (
      <footer>
        <div className={'footer-margin'}>
          <div className={'pure-g'}>
            <section id={'about-section'} className={'pure-u-1 pure-u-lg-1-3'}>
              <h2>What is this?</h2>
              <hr/>
              <ul>
                <MakeLi icon='code-working-sharp' isIcon={true} text='YTF Project'/>
                <MakeLi icon='logo-github' isIcon={true} text='Source code'/>
                <MakeLi icon='mail-sharp' isIcon={true} text='Contact'/>
              </ul>
            </section>
            <section id={'documentation-section'} className={'pure-u-1 pure-u-lg-1-3'}>
              <h2>Documentation</h2>
              <hr/>
              <ul>
                <MakeLi icon='folder-open-sharp' isIcon={true} text='Documents'/>
                <MakeLi icon='help-circle-sharp' isIcon={true} text='FAQ'/>
                <MakeLi icon='layers-sharp' isIcon={true} text='Dependency licences'/>
              </ul>
            </section>
            <section id={'support-section'} className={'pure-u-1 pure-u-lg-1-3'}>
              <h2>Support</h2>
              <hr/>
              <ul>
                <MakeLi icon='btc' isIcon={false} text='GpZUvhdVkCFxqF4vuaiFxtBTxB3L94vnK'/>
                <MakeLi icon='xmr' isIcon={false} text='4G5dUFTbFWYfZAk69irnDUCTNZzP5viNTmkGpCNCLHjjYQq7jjRTWoYTH1aY8P841hExP31Qxg2hXPtxreKu11zCYdxQUj'/>
                <MakeLi icon='eth' isIcon={false} text='x15b9F199b4Db223Ac35bfd5c43B7036E29d06141'/>
              </ul>
            </section>
          </div>
          <hr/>
          <div className={'pure-g'}>
            <span id={'copyright-notice'} className={'pure-u-1 pure-u-lg-1-2'}>
              Copyright © 2024 Knight Hat. All Rights Reserved.
            </span>
            <GetVersion/>
          </div>
        </div>
      </footer>
  )
}