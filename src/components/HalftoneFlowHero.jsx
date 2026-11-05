import { useEffect, useRef, useState } from "react";

export const SILVER_PALETTE = {
  ground: "#08090c",
  flow: "#c0c0c0",
  hot: "#e8e9ef",
  text: "#f4f5f7",
};

export function hexToRgb(hex) {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  const n = parseInt(h.slice(0, 6), 16);
  if (Number.isNaN(n) || h.length < 6) return [0, 0, 0];
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function backing(css, dpr) {
  return Math.max(1, Math.round(css * Math.min(2, Math.max(1, dpr || 1))));
}

const VERT = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";

const FRAG =
  "precision highp float;" +
  "uniform vec2 uRes;uniform float uTime;uniform vec2 uMouse;uniform float uHover;uniform float uIntro;uniform float uCell;" +
  "uniform vec3 uGround;uniform vec3 uFlow;uniform vec3 uHot;" +
  "float flow(vec2 p,float t){vec2 w=p*2.;for(int i=1;i<6;i++){float fi=float(i);" +
  "w+=vec2(.85/fi*sin(fi*w.y*1.2+t*.42+fi*2.3),.7/fi*cos(fi*w.x*1.05-t*.31+fi*1.1));}" +
  "float b=.5+.5*sin(w.x*2.6-w.y*1.7);return smoothstep(.15,1.,pow(b,2.2));}" +
  "void main(){" +
  "float a=.5236;mat2 R=mat2(cos(a),-sin(a),sin(a),cos(a));" +
  "vec2 px=R*gl_FragCoord.xy;vec2 cell=floor(px/uCell);vec2 cc=(cell+.5)*uCell;" +
  "vec2 cs=(cc*R-.5*uRes)/uRes.y;" +
  "vec2 p=(gl_FragCoord.xy-.5*uRes)/uRes.y;" +
  "float I=flow(cs,uTime);" +
  "float md=length(p-uMouse);I=clamp(I+uHover*.72*exp(-md*md*7.5),0.,1.);" +
  "I*=uIntro;" +
  "float r=sqrt(I)*.54*uCell;float d=length(px-cc);" +
  "float dotm=1.-smoothstep(r-1.,r+.6,d);" +
  "float g=flow(p,uTime)*uIntro;" +
  "vec3 col=uGround+uFlow*g*.16;" +
  "vec3 ink=mix(uFlow,uHot,smoothstep(.7,1.,I)*.85);" +
  "col=mix(col,ink,dotm);" +
  "vec2 uv=gl_FragCoord.xy/uRes;col*=mix(.6,1.,smoothstep(1.1,.3,length((uv-.5)*vec2(1.,1.25))));" +
  "gl_FragColor=vec4(col,1.);}";

function compile(gl, type, src) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    gl.deleteShader(s);
    return null;
  }
  return s;
}

export default function HalftoneFlowHero({
  palette = SILVER_PALETTE,
  dotSize = 7,
  className = "",
}) {
  const host = useRef(null);
  const live = useRef({ pal: palette, dotSize });
  live.current = { pal: palette, dotSize };
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const holder = host.current;
    if (!holder) return;
    const cv = document.createElement("canvas");
    cv.className = "hfh-canvas";
    holder.appendChild(cv);
    const gl = cv.getContext("webgl", { antialias: false, alpha: false });
    const vs = gl && compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = gl && compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = gl && gl.createProgram();
    if (!gl || !vs || !fs || !prog) {
      cv.remove();
      setFailed(true);
      return;
    }
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const u = (n) => gl.getUniformLocation(prog, n);
    const U = {
      res: u("uRes"),
      time: u("uTime"),
      mouse: u("uMouse"),
      hover: u("uHover"),
      intro: u("uIntro"),
      cell: u("uCell"),
      ground: u("uGround"),
      flow: u("uFlow"),
      hot: u("uHot"),
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const size = { w: 1, h: 1, left: 0, top: 0, dpr: 1 };
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, hover: 0, thover: 0 };
    let raf = 0;
    let running = false;
    let onScreen = true;
    let t = 0;
    let last = performance.now();
    const start = performance.now();

    const draw = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const L = live.current;
      if (!reduce.matches) t += dt;
      const intro = reduce.matches ? 1 : Math.min(1, Math.max(0, (now - start - 250) / 1800));
      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;
      pointer.hover += (pointer.thover - pointer.hover) * 0.06;
      const g = hexToRgb(L.pal.ground);
      const f = hexToRgb(L.pal.flow);
      const h = hexToRgb(L.pal.hot);
      gl.uniform2f(U.res, cv.width, cv.height);
      gl.uniform1f(U.time, t + 4);
      gl.uniform2f(U.mouse, pointer.x, pointer.y);
      gl.uniform1f(U.hover, reduce.matches ? 0 : pointer.hover);
      gl.uniform1f(U.intro, 1 - Math.pow(1 - intro, 3));
      gl.uniform1f(U.cell, Math.max(3, L.dotSize) * size.dpr);
      gl.uniform3f(U.ground, g[0], g[1], g[2]);
      gl.uniform3f(U.flow, f[0], f[1], f[2]);
      gl.uniform3f(U.hot, h[0], h[1], h[2]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const measure = () => {
      const r = cv.getBoundingClientRect();
      size.w = r.width;
      size.h = r.height;
      size.left = r.left;
      size.top = r.top;
      size.dpr = Math.min(2, Math.max(1, window.devicePixelRatio || 1));
      cv.width = backing(r.width, size.dpr);
      cv.height = backing(r.height, size.dpr);
      gl.viewport(0, 0, cv.width, cv.height);
      if (!running) draw(performance.now());
    };

    const loop = (now) => {
      draw(now);
      raf = running ? requestAnimationFrame(loop) : 0;
    };

    const sync = () => {
      const want = onScreen && !document.hidden && !reduce.matches;
      if (want && !running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(loop);
      } else if (!want && running) {
        running = false;
        cancelAnimationFrame(raf);
        draw(performance.now());
      }
    };

    const stage = holder.closest(".hero") || holder.parentElement || holder;
    const syncPointer = (e) => {
      const r = cv.getBoundingClientRect();
      size.left = r.left;
      size.top = r.top;
      size.w = r.width;
      size.h = r.height;
      if (size.h <= 0) return;
      pointer.tx = (e.clientX - size.left - size.w / 2) / size.h;
      pointer.ty = (size.h / 2 - (e.clientY - size.top)) / size.h;
    };
    const onEnter = (e) => {
      pointer.thover = 1;
      syncPointer(e);
    };
    const onMove = (e) => {
      pointer.thover = 1;
      syncPointer(e);
    };
    const onLeave = (e) => {
      if (e.relatedTarget && stage.contains(e.relatedTarget)) return;
      pointer.thover = 0;
    };

    const ro = new ResizeObserver(measure);
    ro.observe(cv);
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      sync();
    });
    io.observe(stage);
    document.addEventListener("visibilitychange", sync);
    reduce.addEventListener("change", sync);
    stage.addEventListener("pointerenter", onEnter);
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    measure();
    sync();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduce.removeEventListener("change", sync);
      stage.removeEventListener("pointerenter", onEnter);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      cv.remove();
    };
  }, []);

  return (
    <div className={`hfh-bg ${className}`} aria-hidden="true">
      {failed ? <div className="hfh-fallback" /> : null}
      <div ref={host} className="hfh-host" />
      <div className="hfh-scrim" />
    </div>
  );
}
