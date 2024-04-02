import {FormEvent} from "react";
import {useSearchParams} from "react-router-dom";

import './search-bar.css'

export function SearchBar() {
  const [params] = useSearchParams();
  const searchKey = params.get('key');

  /*
    Prevent page from redirecting user to empty search page
   */
  const handleSubmit = (event: FormEvent) => {
    const searchBar = document.getElementById('search-bar') as HTMLInputElement;
    if (searchBar == null || searchBar.value.length === 0)
      event.preventDefault();
  }

  return (
      <form
          className={'search-bar-container'}
          action={'/search'}
          onSubmit={handleSubmit}
      >
        <label htmlFor='search-bar'/>
        <input
            type='text'
            id='search-bar'
            name='key'
            placeholder='Search'
            defaultValue={searchKey ? searchKey : ''}
        />
        <hr/>
      </form>
  )
}