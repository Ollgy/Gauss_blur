import React from 'react';
import { Scene } from '../Scene';
import { updateBlur, updateImage } from '../../WebGL/initScene.js';
import { PowerBar } from '../PowerBar';
import { FileInput } from '../FileInput';
import { Stub } from '../Stub';
import resources from '../../const/resources';
import { Button } from '../Button';

export const INIT_POWER = 1;
export const POWER_RATIO = 0.05

export class AppContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      power: INIT_POWER,
      file: {},
      powerRatio: POWER_RATIO,
      image: ""
    }
  }

  onPowerChange(e) {
    const power = e.target.value;

    this.setState({ power });
    updateBlur(power * this.state.powerRatio);
  }

  onImageChange(e) {
    let f = e.target.files[0], 
    fr = new FileReader();
    
    if(f.type.indexOf('image') === -1)
      return;

    fr.onload = e => {
      const image = e.target.result;
      this.setState({ image, file: f, power: INIT_POWER });
      updateImage(image);
    }

    fr.readAsDataURL(f);
  }

  saveImage() {
    if (!this.state.image) {
      return;
    }

    const canvas = document.querySelector("#canvas");
    const ext = this.state.file.name.match(/\.[^/.]+$/);
    var imageData = canvas.toDataURL("image/png");
    var image = new Image();
    image.src = imageData;
    
    var link = document.createElement("a");
    link.setAttribute("href", image.src);
    link.setAttribute("download", this.state.file.name.replace(ext, `_blur.${ext}`));
    link.click();
  }

  render() {
    return <main>
      <section className="section section--panel">
        <div className="panelblock panelblock--title">
          <h1>{resources.panelTitle}</h1> 
        </div>
        <div className="panelblock panelblock--powerbar">
          <PowerBar power={this.state.power} onChange={(e) => this.onPowerChange(e)}/>
        </div>
        <div className="panelblock panelblock--buttons">
          <FileInput onChange={(e) => this.onImageChange(e)}/>
          <Button text={resources.saveButton} onClick={() => this.saveImage()}/>
        </div>
      </section>
      <section className="section section--image">
        {!this.state.image ? <Stub text={resources.imageStub}/> : null}
        <Scene visibility={!!this.state.image}/>
      </section>
    </main>
  }
}