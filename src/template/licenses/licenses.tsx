import './licenses.css'

import licenses from '../../assets/licenses.json'

class License {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  getUrl(): string {
    return `https://opensource.org/license/${this.name.toLowerCase()}`
  }
}

class Dependency {
  name: string;
  version: string;
  license: License;

  constructor(name: string, version: string, license: License) {
    this.name = name;
    this.version = version;
    this.license = license;
  }
}

function extractVersion(input: string): [string, string] {
  let i: number = input.length;
  while (i > 0)
    if (input.charAt(i) === '@')
      break
    else i--;

  return [input.substring(0, i), input.substring(i + 1, input.length)];
}

function getDependencies(): Dependency[] {
  const dependencies: Dependency[] = []

  Object.keys(licenses).map((key: string) => {
    if (key == 'ytf-frontend@0.0.0')
      return;

    const [name, version] = extractVersion(key);
    const license = new License(licenses[key].licenses)
    dependencies.push(new Dependency(name, version, license));
  });

  return dependencies
}

export default function Licenses() {

  return (
      <table>
        <tr>
          <th>Name</th>
          <th>Version</th>
          <th>License</th>
        </tr>
        {getDependencies().map(dependency => {
          return (
              <tr>
                <td>{dependency.name}</td>
                <td>{dependency.version}</td>
                <td><a href={dependency.license.getUrl()} target='_blank'>
                  {dependency.license.name}
                </a></td>
              </tr>
          )
        })}
      </table>
  )
}