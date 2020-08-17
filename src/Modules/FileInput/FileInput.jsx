import React from 'react';
import resources from '../../const/resources';

export const FileInput = ({ value, onChange }) => <div className="button button--file">
  <input id="file" name="file" type="file" className="button__file" value={value} onChange={(e) => onChange(e)}/>
  <label htmlFor="file">{resources.chooseButton}</label>
</div>