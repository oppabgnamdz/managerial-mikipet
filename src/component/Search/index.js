import React from 'react';
import './style.scss';
export default function Index({ filter, setFilter }) {
  return (
    <div className="search">
      <div class="form__group field">
        <input
          type="input"
          class="form__field"
          value={filter || ''}
          name="name"
          id="name"
          onChange={(e) => {
            setFilter(e.target.value);
          }}    
          required
        />
        <label for="name" class="form__label">
          Search
        </label>
      </div>
    </div>
  );
}
