# react-three-nephilim
Nephilim is a React framework for Three.js allowing you to easily create sophisticated animated scenes.
Nephilim introducing Scene-Controller concept, where instead of regular Views, navigation is carried out between Scenes in 3D space.
The idea is that global THREE.Scene consists of several Scenes (THREE.Group) - "Views", and Nephilim carries out "routing" between them -
moves currently active Scene behind the scenes and brings another Scene to front.
This allows to achieve results that could be checked out <a href="http://nephilim.herokuapp.com">here</a>.

Nephilim includes following features:
- Intuitive React Components;
- Adds Scene-Controller structure to application powered by Three.js;
- Mixed GL and HTML scenes powered by WebGlRenderer and CSS3DRenderer;
- Animated actions, several types of motions (random/static position, rotation, scale, mouse tracking, morph);
- Several types of composition of GL and/or HTML objects within a container;
- Adaptive positioning of objects on the Scene;
- Post Processing support;
- Basic Routing.
- three-nebula integration (without json loader)

# React
Requires react >17

# Installation
- $npm i react-three-nephilim

# Build
- $cd react-three-nephilim
- $npm i
- $npm run transpile

# Usage

```javascript
.nephilim {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.button {
  cursor: pointer;
}
```

Basic html example:
```javascript
import React from 'react';
import Nephilim, { Hypertext } from 'react-three-nephilim';
import './css/style.css';

export const App = () => (
  <div className={'nephilim'}>
    <Nephilim
      camera={{
        type: 'perspective',
        fov: 40,
        near: 1,
        far: 200000
      }}
      cssRenderer={true}
    >
      <Hypertext
        position={{ x: 10, y: 20, z: -300 }}
        rotation={{ x: 1, y: 1, z: 1 }}
      >
        <div style={{ fontSize: 12 }}>
          Hello World Static
        </div>
      </Hypertext>
      <Hypertext
        position={{ z: -300 }}
        motion={{
          position: { axes: 'xyz', maxValue: 10, velocity: 0.1 },
          rotation: { axes: 'xyz', maxValue: 10, velocity: 0.01 },
          scale: { axes: 'xy', maxValue: 5, velocity: 0.01 }
        }}
      >
        <div style={{ fontSize: 12 }}>
          Hello World Motion
        </div>
      </Hypertext>
    </Nephilim>
  </div>
);
```

Basic mesh example:
```javascript
import React from 'react';
import Nephilim, { Mesh } from 'react-three-nephilim';
import './css/style.css';

export const App = () => (
  <div className={'nephilim'}>
    <Nephilim
      camera={{
        type: 'perspective',
        fov: 40,
        near: 1,
        far: 200000
      }}
      glRenderer={true}
    >
      <Mesh
        position={{ z: -300 }}
        geometry={{
          type: 'box',
          params: [30, 20, 20]
        }}
        material={{
          type: 'basic',
          params: {
            color: 0xffffff
          }
        }}
        motion={{
          rotation: { axes: 'xyz', maxValue: 10, randVelocity: 0.01 },
          position: { axes: 'xyz', maxValue: 100, randVelocity: 1 }
        }}
      />
    </Nephilim>
  </div>
);
```

Mixed example:
```javascript
import React from 'react';
import Nephilim, { Mesh, Hypertext } from 'react-three-nephilim';
import './css/style.css';

export const App = () => (
  <div className={'nephilim'}>
    <Nephilim
      camera={{
        type: 'perspective',
        fov: 40,
        near: 1,
        far: 200000
      }}
      glRenderer={true}
      cssRenderer={true}
    >
      <Hypertext
        position={{ z: -300 }}
        motion={{
          position: { axes: 'xyz', maxValue: 10, velocity: 0.1 },
          rotation: { axes: 'xyz', maxValue: 10, velocity: 0.01 },
          scale: { axes: 'xy', maxValue: 5, velocity: 0.01 }
        }}
      >
        <div style={{ fontSize: 12, color: 'white' }}>
          Text
        </div>
      </Hypertext>
      <Mesh
        position={{ z: -300 }}
        geometry={{
          type: 'box',
          params: [30, 20, 20]
        }}
        material={{
          type: 'basic',
          params: {
            color: 0xffffff
          }
        }}
        motion={{
          rotation: { axes: 'xyz', maxValue: 10, randVelocity: 0.01 },
          position: { axes: 'xyz', maxValue: 100, randVelocity: 1 }
        }}
      />
    </Nephilim>
  </div>
);
```

More complex example - components, hook, extend Scene:
```javascript
import React, { useState } from 'react';
import Nephilim, { Scene, Container, Mesh, Hypertext, Light } from 'react-three-nephilim';
import './css/style.css';

const actions = {
  main: {
    // 'Main:Navigate' syntax is required only for Navigate action 
    // to determine which Scene to apply Navigate to
    // In reqular case it could look like SomeActionName: { position: {...}, rotation: {...}, scale: {...} }
    // manager.getAction('SomeActionName').begin();
    'Main:Navigate': {
      position: { y: 0 }
    },
    'Second:Navigate': {
      position: { y: 1000 }
    }
  },
  second: {
    'Main:Navigate': {
      position: { y: -1000 }
    },
    'Second:Navigate': {
      position: { y: 0 }
    }
  }
};

const MainScene = () => {

  // useState hook to take manager from scene
  const [manager, setManager] = useState(null);

  // Scene could either have children or be extended by AnotherScene with custom render() {...}
  // Since MainScene in this case is not related to Nephilim components, it doesn't have references to manager
  // manager (Nephilim singleton) is injected in any related component and could be taken: ref={s => s && setManager(s.manager)}
  return (
    <Scene
      ref={s => s && setManager(s.manager)}
      id={'Main'}
      isInitial={true}
      position={{ y: -1000, z: -500 }}
      navigationDuration={1000}
      actions={actions.main}
    >
      <Hypertext>
        <div
          className={'button'}
          onClick={() => manager.navigate('Second')}
        >
          Navigate to Second Scene
        </div>
      </Hypertext>
      <Mesh
        geometry={{
          type: 'box',
          params: [50, 20, 20]
        }}
        material={{
          type: 'phong',
          params: {
            specular: 0x47e9f5,
            color: 0x47e9f5
          }
        }}
        motion={{
          rotation: { axes: 'xyz', maxValue: 10, randVelocity: 0.01 },
          position: { axes: 'xyz', maxValue: 100, randVelocity: 1 }
        }}
      />
    </Scene>
  )
};

class SecondScene extends Scene {
  render() {
    // Container could either have children or be extended by AnotherContainer with custom render() {...}
    return (
      <Container>
        <Hypertext>
          <div
            className={'button'}
            onClick={() => this.manager.navigate('Main')}
          >
            Back to Main Scene
          </div>
        </Hypertext>
        <Mesh
          geometry={{
            type: 'sphere',
            params: [20, 100, 100]
          }}
          material={{
            type: 'phong',
            params: {
              specular: 0x47e9f5,
              color: 0x47e9f5
            }
          }}
          motion={{
            rotation: { axes: 'xyz', maxValue: 10, randVelocity: 0.01 },
            position: { axes: 'xyz', maxValue: 100, randVelocity: 1 }
          }}
        />
      </Container>
    );
  }
}

export const App = () => (
  <div className={'nephilim'}>
    <Nephilim
      camera={{
        type: 'perspective',
        fov: 40,
        near: 1,
        far: 200000
      }}
      glRenderer={{ alpha: true }}
      cssRenderer={true}
    >
      <MainScene />
      <SecondScene
        id={'Second'}
        position={{ y: -1000, z: -500 }}
        navigationDuration={1000}
        actions={actions.second}
      />
      <Light
        type={'directional'}
        params={[0xffffff, 0.1]}
      />
      <Light
        type={'ambient'}
        params={[0xffffff, 0.5]}
      />
    </Nephilim>
  </div>
);
```

Nephilim settings:
```javascript
const routes = {
  Main: '/', // <Scene id={'Main'} />
  Second: '/second' // Also <id>: { path: '/...', callback: (manager, route) => {...} } is acceptable
  // where callback is a function that should be executed after navigation to the Scene
};
const postProcessing = {
  UnrealBloom: {
    src: UnrealBloomPass,
    params: [...]
  },
  BleachBypassShader: {
    src: BleachBypassShader,
    uniforms: {
      opacity: 0.7
    }
  },
  FreiChenShader: {
    src: FreiChenShader
  }
};
const loaders = ['OBJ', 'MTL'];

export const App = () => (
  <div className={'nephilim'}>
    <Nephilim
      camera={{
        type: 'perspective',
        fov: 40,
        near: 1,
        far: 200000
      }}
      glRenderer={{
        alpha: true,
        antialias: true,
        autoClear: false
      }}
      cssRenderer={true}
      layerRendering={true}
      loaders={loaders}
      routes={routes}
      postProcessing={postProcessing}
    >
      {...}
    </Nephilim>
  </div>
);
```


It is not absolutely necessary to use controllers in your app and just follow regular React approach as described in examples,
but they provide some useful functionality to separate control logic and manage Scenes.
Advanced examples you can find <a href="http://nephilim.herokuapp.com/examples">here</a>.

# TODO
- Geometry Component
- Material Component
- Motion Component
- Route Component
- Enums for all types