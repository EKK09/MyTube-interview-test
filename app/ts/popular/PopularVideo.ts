import Video from "../video/Video";

const popularVideo: Video = new Video();

popularVideo.title = "David Wu Sponser Me Video 2020";
popularVideo.description = `
	Hello! I'm David. skate for eight years, My favorite trick is heelflips, I can just do it all day
	actually I haven't land a heelflip over gap, don't worry about that,  I will take it soon.
`;
popularVideo.duration = "PT80H11M11S";
popularVideo.imageUrl = "./image/002.gif";
popularVideo.favorite = true;

export default popularVideo;
