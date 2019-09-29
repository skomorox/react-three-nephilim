# react-three-composition
Composition is a React wrapper around Three.js allowing you to easily create sophisticated animated scenes.
Composition introducing Scene-Controller concept, where instead of regular Views, navigation is carried out between Scenes in 3D space.
The idea is that global THREE.Scene consists of several Composition Scenes (THREE.Group) - "Views", and Compostion carries out "routing" between them -
moves currently active Scene behind the scenes and brings another Scene to front.
This allows to achieve pretty interesting behaviour of SPA that could be checked out <a href="http://skomorox.herokuapp.com">here</a>.
It is not absolutely necessary to use controllers in your app and just follow regular React approach, but they provide some useful methods to manage Scenes.

Composition includes following features:
- Intuitive React Components
- Adds Scene-Controller structure to application powered by Three.js
- Mixed GL and HTML scenes
- Animated actions, several types of motions (random/static position, rotation, scale, mouse tracking, morph)
- Several types of composition of GL and/or HTML objects within a container
- Adaptive positioning of objects on the scene
- Post Processing support

# Installation
npm i react-three-composition

# Usage

Basic html example:
```javascript
import React from 'react';
import Composition, { Hypertext } from 'react-three-composition';

export const App = () => (
  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
    <Composition
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
          position: { axes: 'xyz', maxValue: 10, speed: 0.1 },
          rotation: { axes: 'xyz', maxValue: 10, speed: 0.01 },
          scale: { axes: 'xy', maxValue: 5, speed: 0.01 }
        }}
      >
        <div style={{ fontSize: 12 }}>
          Hello World Motion
        </div>
      </Hypertext>
    </Composition>
  </div>
);
```

Basic mesh example:
```javascript
import React from 'react';
import Composition, { Mesh } from 'react-three-composition';

export const App = () => (
  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
    <Composition
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
          rotation: { axes: 'xyz', maxValue: 10, randSpeed: 0.01 },
          position: { axes: 'xyz', maxValue: 100, randSpeed: 1 }
        }}
      />
    </Composition>
  </div>
);
```

Mixed example:
```javascript
import React from 'react';
import Composition, { Mesh, Hypertext } from 'react-three-composition';

export const App = () => (
  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
    <Composition
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
          position: { axes: 'xyz', maxValue: 10, speed: 0.1 },
          rotation: { axes: 'xyz', maxValue: 10, speed: 0.01 },
          scale: { axes: 'xy', maxValue: 5, speed: 0.01 }
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
          rotation: { axes: 'xyz', maxValue: 10, randSpeed: 0.01 },
          position: { axes: 'xyz', maxValue: 100, randSpeed: 1 }
        }}
      />
    </Composition>
  </div>
);
```

Create Scene:
```javascript
import React from 'react';
import { Scene, Container, Hypertext } from 'react-three-composition';

export class ExampleScene extends Scene {
  render() {
    return (
      <Container ref={c => this.children.root = c}>
        <Hypertext
          position={{ x: 10, y: 20, z: 30 }}
          rotation={{ x: 1, y: 1, z: 1 }}
          scale={{ x: 1.5, y: 0.7 }}
        >
          <div style={{ opacity: 0.8 }}>
            <div className={'examples-tooltip'}>
              Example Tooltip
            </div>
          </div>
        </Hypertext>
      </Container>
    );
  }
}
```

Advanced examples you can find here: http://skomorox.herokuapp.com/ --> Intro --> Usage Examples
