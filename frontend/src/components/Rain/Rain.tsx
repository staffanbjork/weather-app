import { rainSnowSleetThunder } from "../../utils/rainSnowSleetThunder";

export default function Rain({ws}: { ws: number }) {
  const { isRaining, isSnowing, isSleet, isThunder, rain, snow } = rainSnowSleetThunder.getSettings(ws);

  const snowFlakes = Array.from({ length: snow }).map((_, s) => {
    const randomSnowFlakeStyle = Math.floor(Math.random() * 3);
    const styles = {
      "--x": Math.floor(Math.random() * 100),
      "--y": Math.floor(Math.random() * 100),
      "--o": Math.random(),
      "--a": isSleet ? Math.random() + 4 : Math.random() + 10,
      "--d": Math.random() * 2 - 1,
      "--s": Math.random(),
    } as React.CSSProperties;

    return <i key={s} className={`snow__flake bi bi-snow${randomSnowFlakeStyle === 0 ? "" : `${randomSnowFlakeStyle + 1}`}`} style={styles}></i>;
  })

  const rainDrops = Array.from({ length: rain }).map((_, r) => {
    const styles = {
      "--x": Math.floor(Math.random() * 100),
      "--y": Math.floor(Math.random() * 100),
      "--o": Math.random(),
      "--a": Math.random() + 0.5,
      "--d": Math.random() * 2 - 1,
      "--s": Math.random(),
    } as React.CSSProperties;

    return (
      <svg
        key={r}
        className="rain__drop"
        preserveAspectRatio="xMinYMin"
        viewBox="0 0 5 50"
        style={styles}
      >
        <path
          stroke="none"
          d="M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"
        />
      </svg>
    );
  });
  return <div className={`rain ${isThunder ? "lightning" : ""}`}>
    {isRaining && (rainDrops)}
    {isSnowing && (snowFlakes)}
  </div>
}   