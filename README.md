# react-three-composition
Composition is a React wrapper around Three.js allowing you to easily create sophisticated animated scenes.
Composition introducing Scene-Controller concept, where instead of regular Views, navigation is carried out between Scenes in 3D space.

Composition includes the following features:
- Intuitive React Components
- Adds Scene-Controller structure to application powered by Three.js
- Mixed GL and HTML scenes
- Animated actions, several types of motions (random/static position, rotation, scale, mouse tracking, morph)
- Several types of composition of GL and/or HTML objects within a container
- Adaptive positioning of objects on the scene
- Post Processing support

# Usage

```javascript
<Composition
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
>
  <MainScene id={'Main'} />
</Composition>
```
