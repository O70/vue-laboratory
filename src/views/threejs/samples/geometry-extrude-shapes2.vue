<template>
  <div ref="container"/>
</template>
<script>
import * as THREE from 'three'

export default {
  data() {
    const DEGS_TO_RADS = Math.PI / 180
    const DIGIT_0 = 48
    const DIGIT_9 = 57
    const COMMA = 44
    const SPACE = 32
    const PERIOD = 46
    const MINUS = 45

    return {
      three: {
        scene: new THREE.Scene(),
        camera: new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000),
        renderer: new THREE.WebGLRenderer({ antialias: true })
      },
      d3g: {
        transformSVGPath(pathStr) {
          const path = new THREE.ShapePath()
          let idx = 1
          const len = pathStr.length
          let activeCmd
          let x = 0
          let y = 0
          let nx = 0
          let ny = 0
          let firstX = null
          let firstY = null
          let x1 = 0
          let x2 = 0
          let y1 = 0
          let y2 = 0
          let rx = 0
          let ry = 0
          let xar = 0
          let laf = 0
          let sf = 0
          let cx
          let cy
          function eatNum() {
            let sidx
            let c
            let isFloat = false
            let s
            // eat delims
            while (idx < len) {
              c = pathStr.charCodeAt(idx)
              if (c !== COMMA && c !== SPACE) break
              idx++
            }
            if (c === MINUS) {
              sidx = idx++
            } else {
              sidx = idx
            }
            // eat number
            while (idx < len) {
              c = pathStr.charCodeAt(idx)
              if (DIGIT_0 <= c && c <= DIGIT_9) {
                idx++
                continue
              } else if (c === PERIOD) {
                idx++
                isFloat = true
                continue
              }
              s = pathStr.substring(sidx, idx)
              return isFloat ? parseFloat(s) : parseInt(s)
            }
            s = pathStr.substring(sidx)
            return isFloat ? parseFloat(s) : parseInt(s)
          }
          function nextIsNum() {
            var c
            // do permanently eat any delims...
            while (idx < len) {
              c = pathStr.charCodeAt(idx)
              if (c !== COMMA && c !== SPACE) break
              idx++
            }
            c = pathStr.charCodeAt(idx)
            return (c === MINUS || (DIGIT_0 <= c && c <= DIGIT_9))
          }
          var canRepeat
          activeCmd = pathStr[ 0 ]
          while (idx <= len) {
            canRepeat = true
            switch (activeCmd) {
              // moveto commands, become lineto's if repeated
              case 'M':
                x = eatNum()
                y = eatNum()
                path.moveTo(x, y)
                activeCmd = 'L'
                firstX = x
                firstY = y
                break
              case 'm':
                x += eatNum()
                y += eatNum()
                path.moveTo(x, y)
                activeCmd = 'l'
                firstX = x
                firstY = y
                break
              case 'Z':
              case 'z':
                canRepeat = false
                if (x !== firstX || y !== firstY) path.lineTo(firstX, firstY)
                break
              // - lines!
              case 'L':
              case 'H':
              case 'V':
                nx = (activeCmd === 'V') ? x : eatNum()
                ny = (activeCmd === 'H') ? y : eatNum()
                path.lineTo(nx, ny)
                x = nx
                y = ny
                break
              case 'l':
              case 'h':
              case 'v':
                nx = (activeCmd === 'v') ? x : (x + eatNum())
                ny = (activeCmd === 'h') ? y : (y + eatNum())
                path.lineTo(nx, ny)
                x = nx
                y = ny
                break
              // - cubic bezier
              case 'C':
                x1 = eatNum()
                y1 = eatNum()
                break
              case 'S':
                if (activeCmd === 'S') {
                  x1 = 2 * x - x2
                  y1 = 2 * y - y2
                }
                x2 = eatNum()
                y2 = eatNum()
                nx = eatNum()
                ny = eatNum()
                path.bezierCurveTo(x1, y1, x2, y2, nx, ny)
                x = nx
                y = ny
                break
              case 'c':
                x1 = x + eatNum()
                y1 = y + eatNum()
                break
              case 's':
                if (activeCmd === 's') {
                  x1 = 2 * x - x2
                  y1 = 2 * y - y2
                }
                x2 = x + eatNum()
                y2 = y + eatNum()
                nx = x + eatNum()
                ny = y + eatNum()
                path.bezierCurveTo(x1, y1, x2, y2, nx, ny)
                x = nx
                y = ny
                break
              // - quadratic bezier
              case 'Q':
                x1 = eatNum()
                y1 = eatNum()
                break
              case 'T':
                if (activeCmd === 'T') {
                  x1 = 2 * x - x1
                  y1 = 2 * y - y1
                }
                nx = eatNum()
                ny = eatNum()
                path.quadraticCurveTo(x1, y1, nx, ny)
                x = nx
                y = ny
                break
              case 'q':
                x1 = x + eatNum()
                y1 = y + eatNum()
                break
              case 't':
                if (activeCmd === 't') {
                  x1 = 2 * x - x1
                  y1 = 2 * y - y1
                }
                nx = x + eatNum()
                ny = y + eatNum()
                path.quadraticCurveTo(x1, y1, nx, ny)
                x = nx
                y = ny
                break
              // - elliptical arc
              case 'A':
                rx = eatNum()
                ry = eatNum()
                xar = eatNum() * DEGS_TO_RADS
                laf = eatNum()
                sf = eatNum()
                nx = eatNum()
                ny = eatNum()
                if (rx !== ry) console.warn('Forcing elliptical arc to be a circular one:', rx, ry)
                // SVG implementation notes does all the math for us! woo!
                // http://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes
                // step1, using x1 as x1'
                x1 = Math.cos(xar) * (x - nx) / 2 + Math.sin(xar) * (y - ny) / 2
                y1 = -Math.sin(xar) * (x - nx) / 2 + Math.cos(xar) * (y - ny) / 2
                // step 2, using x2 as cx'
                var norm = Math.sqrt((rx * rx * ry * ry - rx * rx * y1 * y1 - ry * ry * x1 * x1) /
                  (rx * rx * y1 * y1 + ry * ry * x1 * x1))
                if (laf === sf) norm = -norm
                x2 = norm * rx * y1 / ry
                y2 = norm * -ry * x1 / rx
                // step 3
                cx = Math.cos(xar) * x2 - Math.sin(xar) * y2 + (x + nx) / 2
                cy = Math.sin(xar) * x2 + Math.cos(xar) * y2 + (y + ny) / 2
                var u = new THREE.Vector2(1, 0)
                var v = new THREE.Vector2((x1 - x2) / rx, (y1 - y2) / ry)
                var startAng = Math.acos(u.dot(v) / u.length() / v.length())
                if (((u.x * v.y) - (u.y * v.x)) < 0) startAng = -startAng
                // we can reuse 'v' from start angle as our 'u' for delta angle
                u.x = (-x1 - x2) / rx
                u.y = (-y1 - y2) / ry
                var deltaAng = Math.acos(v.dot(u) / v.length() / u.length())
                // This normalization ends up making our curves fail to triangulate...
                if (((v.x * u.y) - (v.y * u.x)) < 0) deltaAng = -deltaAng
                if (!sf && deltaAng > 0) deltaAng -= Math.PI * 2
                if (sf && deltaAng < 0) deltaAng += Math.PI * 2
                path.absarc(cx, cy, rx, startAng, startAng + deltaAng, sf)
                x = nx
                y = ny
                break
              default:
                throw new Error('Wrong path command: ' + activeCmd)
            }
            // just reissue the command
            if (canRepeat && nextIsNum()) continue
            activeCmd = pathStr[ idx++ ]
          }
          return path
        }
      }
    }
  },
  created() {
    // this.d3threeD(this.d3g)
    this.initThree()
    this.animate()
  },
  mounted() {
    this.initDom()
  },
  methods: {
    // d3threeD(exports) {
    //   exports.transformSVGPath = function(pathStr) {
    //   }
    // },
    addGeoObject(group, svgObject) {
      const paths = svgObject.paths
      const depths = svgObject.depths
      const colors = svgObject.colors
      const center = svgObject.center
      for (let i = 0; i < paths.length; i++) {
        const path = this.d3g.transformSVGPath(paths[i])
        const color = new THREE.Color(colors[i])
        const material = new THREE.MeshLambertMaterial({
          color: color,
          emissive: color
        })
        const depth = depths[i]
        const simpleShapes = path.toShapes(true)
        for (let j = 0; j < simpleShapes.length; j++) {
          const simpleShape = simpleShapes[j]
          const shape3d = new THREE.ExtrudeBufferGeometry(simpleShape, {
            depth: depth,
            bevelEnabled: false
          })
          const mesh = new THREE.Mesh(shape3d, material)
          mesh.rotation.x = Math.PI
          mesh.translateZ(-depth - 1)
          mesh.translateX(-center.x)
          mesh.translateY(-center.y)
          group.add(mesh)
        }
      }
    },
    initThree() {
      this.three.scene.background = new THREE.Color(0xb0b0b0)
      // this.three.renderer.setClearColor(new THREE.Color(0xb0b0b0))
      this.three.camera.position.set(0, 0, 200)

      const group = new THREE.Group()
      this.three.scene.add(group)

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
      directionalLight.position.set(0.75, 0.75, 1.0).normalize()
      this.three.scene.add(directionalLight)

      const ambientLight = new THREE.AmbientLight(0xcccccc, 0.2)
      this.three.scene.add(ambientLight)

      const helper = new THREE.GridHelper(160, 10, 0xff0000)
      helper.rotation.x = Math.PI / 2
      group.add(helper)

      const obj = this.initSVGObject()
      this.addGeoObject(group, obj)

      this.three.renderer.setPixelRatio(window.devicePixelRatio)
      this.three.renderer.setSize(window.innerWidth, window.innerHeight)
    },
    initDom() {
      this.$refs.container.appendChild(this.three.renderer.domElement)
      window.addEventListener('resize', this.onWindowResize, false)
    },
    initSVGObject() {
      const obj = {}

      // The geo data from Taipei City, Keelung City, Taipei County in SVG form
      obj.paths = [
        // Taipei City
        'M366.2182,108.9780 L368.0329,110.3682 L367.5922,112.4411 L369.9258,116.0311 L368.9827,117.3543 ' +
        'L371.5686,119.8491 L370.5599,121.7206 L372.9314,124.8009 L368.8889,126.7603 L369.2695,130.7622 ' +
        'L366.1499,130.3388 L363.4698,128.1161 L362.9256,125.6018 L360.8153,126.4025 L360.2968,124.3588 ' +
        'L361.9519,121.1623 L360.4475,118.7162 L358.1163,117.8678 L358.7094,115.7577 L361.6243,112.4576 Z',
        // Keelung City
        'M380.2689,113.3850 L383.5604,114.2370 L383.7404,114.2386 L385.4082,115.6247 L384.9725,117.4631 ' +
        'L381.6681,117.9439 L383.0209,121.0914 L379.4649,122.7061 L373.4987,118.8487 L372.0980,114.7589 ' +
        'L377.9716,112.0707 Z',
        // Taipei County
        'M359.4486,155.6690 L357.0422,152.7420 L355.1688,148.0173 L357.1186,145.8045 L354.1323,141.2242 ' +
        'L351.1807,141.6609 L348.9387,140.5372 L349.5415,137.8396 L347.5174,136.1694 L347.6299,129.2327 ' +
        'L351.4192,128.8067 L354.2518,125.3113 L352.5805,121.8038 L349.3190,120.9429 L344.3277,116.7676 ' +
        'L350.9772,115.1221 L354.5759,112.5371 L354.5667,110.6949 L357.4098,105.7489 L362.3963,101.8443 ' +
        'L364.4415,101.0819 L364.5314,101.0828 L364.6209,101.1230 L364.7698,101.2029 L368.1221,101.5115 ' +
        'L371.7216,104.1338 L372.2958,106.7261 L375.5949,109.6971 L377.0415,108.8875 L377.0737,108.6526 ' +
        'L377.4037,108.6165 L376.8840,109.7091 L376.7323,109.9037 L377.9416,112.0705 L371.7970,114.8736 ' +
        'L374.0935,119.4031 L380.7848,122.7963 L382.6529,121.9897 L381.5792,117.8256 L385.0339,117.3069 ' +
        'L385.4082,115.6247 L388.7014,116.3969 L389.8697,116.6024 L390.0206,116.4860 L391.0396,116.6118 ' +
        'L394.6665,116.9929 L394.4694,119.2255 L394.3172,119.4987 L395.3792,121.8977 L395.2728,124.0526 ' +
        'L397.2123,125.6350 L401.1709,126.2516 L401.2612,126.2130 L401.4086,126.6060 L400.1992,127.7733 ' +
        'L399.7769,128.0446 L399.6247,128.3179 L398.1779,129.0521 L394.2418,129.2969 L388.7324,130.9385 ' +
        'L389.2782,134.0003 L383.7237,137.0111 L381.7445,139.9336 L379.7001,139.9546 L376.1539,143.0580 ' +
        'L371.3022,144.1094 L368.6009,146.5914 L368.7361,151.1399 L363.6153,154.4980 ' +
        // Taipei County hole.
        'M363.4600,128.3904 L366.6300,130.3829 L369.3732,129.3913 L369.5603,125.6695 L374.3989,125.1677 ' +
        'L370.8412,123.6440 L371.0684,118.8252 L369.0431,117.3157 L369.6882,115.7936 L367.8578,112.8749 ' +
        'L368.1217,110.4867 L366.5152,109.2554 L361.9554,112.3435 L358.1163,117.8678 L361.7218,120.2192 ' +
        'L360.7261,126.3232 L362.8064,125.5221 Z'
      ]
      obj.depths = [19, 20, 21]
      obj.colors = [0xC07000, 0xC08000, 0xC0A000]
      obj.center = { x: 365, y: 125 }

      return obj
    },
    onWindowResize() {
      this.three.camera.aspect = window.innerWidth / window.innerHeight
      this.three.camera.updateProjectionMatrix()
      this.three.renderer.setSize(window.innerWidth, window.innerHeight)
    },
    animate() {
      requestAnimationFrame(this.animate)
      this.render()
    },
    render() {
      this.three.renderer.render(this.three.scene, this.three.camera)
    }
  }
}
</script>
<style>
html, body {
  margin: 0;
  overflow: hidden;
}
</style>
