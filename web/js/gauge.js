AFRAME.registerPrimitive('a-gauge', {
    defaultComponents: {
      gauge: {}
    }
  });
  AFRAME.registerComponent('gauge', {
    init: function() {
      console.log('Hello, World!');
      this.el.innerHTML =
        `
      <a-circle src="#gauge" radius="1" segment="200">
        <a-entity  id="seconds" line="start: 0, 0, 0.005; end: 0 0.625 0.005; color: black" scale="1 1 1">
          <a-image src="#gauge-hand" material="width:10" geometry="height:0.5;width:0.5" visible="" position="-0.026625959998102956 0.1636291153065707 0.008" rotation="0 0 31"></a-image>
        </a-entity>
        <a-entity id="minutes" line="start: 0, 0, 0.005; end: 0 0.5 0.005; color: black" scale="1 1 1">
        </a-entity>
        <a-entity id="hours" line="start: 0, 0, 0.005; end: 0 0.35 0.005; color: black" scale="1 1 1">
        </a-entity>
      </a-circle>
        `;
      let temp = 0.5 / 60;
  
      function startTime() {
        var today = new Date();
        var h = today.getHours();
        if (h > 12) {
          h = h - 12;
        }
        var m = today.getMinutes();
        var s = today.getSeconds();
        document.getElementById('seconds').object3D.rotation.z = -THREE.Math.degToRad(6) * s;
        document.getElementById('minutes').object3D.rotation.z = -THREE.Math.degToRad(6) * m;
        document.getElementById('hours').object3D.rotation.z = -THREE.Math.degToRad(30) * h;
  
        var t = setTimeout(startTime, 1000);
      }
      startTime();
    }
  });