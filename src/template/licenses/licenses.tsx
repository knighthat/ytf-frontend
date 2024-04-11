import './licenses.scss'

import licensesFile from '@/assets/licenses.json'
import {plainToInstance} from "class-transformer";

class DependencyFile {
  [key: string]: {
    licenses: string;
    repository: string;
  }
}

class Dependency {

  name: string;
  version: string;
  license: string;
  repository: string;

  constructor(name: string, license: string, repository: string) {
    let i: number = name.length;
    while (i > 0)
      if (name.charAt(i) === '@')
        break
      else i--;

    this.name = name.substring(0, i);
    this.version = name.substring(i + 1, name.length);
    this.license = license;
    this.repository = repository;
  }

  licenseUrl(): string {
    return `https://opensource.org/license/${this.license.toLowerCase()}`
  }
}

export default function Licenses() {
  const deps: Dependency[] = [];

  const file = plainToInstance(DependencyFile, licensesFile);
  for (const key in licensesFile)
    deps.push(new Dependency(key, file[key].licenses, file[key].repository))

  function License() {
    return deps.map((license, index) =>
        <tr key={index}>
          <td>
            <a href={license.repository} target='_blank'>{license.name}</a>
          </td>
          <td>{license.version}</td>
          <td>
            <a href={license.licenseUrl()} target='_blank'>{license.license}</a>
          </td>
        </tr>
    )
  }

  return (
      <section className={'nice-alignment'}>
        <table className={'pure-table pure-table-horizontal'}>
          <thead>
          <tr>
            <th>Name</th>
            <th>Version</th>
            <th>License</th>
          </tr>
          </thead>
          <tbody>
          {License()}
          </tbody>
        </table>
      </section>
  )
}