{
    type Video={
        title:string;
        author:string;
    };

    type Optional<T>={
        [p in keyof T]?:T[p]; //for .. in
    }

    type Readonly<T>={
        readonly [P in keyof T]:T[P];
    }

    type VideoOptional=Optional<Video>;
}