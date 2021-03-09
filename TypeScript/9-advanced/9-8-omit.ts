{
    type Video={
        id:string,
        title:string,
        url:string,
        data:string,
    }

    type VideoMetaData=Omit<Video,'url' | 'data'>
}