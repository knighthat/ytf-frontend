import './licenses.css'

import licensesFile from '../../assets/licenses.json'
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

  const depFile = plainToInstance(DependencyFile, licensesFile);
  const deps: Dependency[] = [];
  for (const key in depFile) {
    if (key === "ytf-frontend@0.0.0")
      continue;
    deps.push(new Dependency(key, depFile[key].licenses, depFile[key].repository));
  }

  return (
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Version</th>
          <th>License</th>
        </tr>
        </thead>
        <tbody>
        {
          deps.map((license, index) => {
            return (
                <tr key={index}>
                  <td>
                    <a href={license.repository} target='_blank'>
                      {license.name}
                    </a>
                  </td>
                  <td>{license.version}</td>
                  <td>
                    <a href={license.licenseUrl()} target='_blank'>
                      {license.license}
                    </a>
                  </td>
                </tr>
            )
          })
        }
        </tbody>
      </table>
  )
}