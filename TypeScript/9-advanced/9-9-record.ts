{
    type PageInfo={
        title:string;
    }
    type Page='home' | 'about' | 'contact';

    //map 자료구조 처럼 key value쌍으로 만든다.
    const nav:Record<Page,PageInfo>={
        home:{title:"Home"},
        about:{title:'about'},
        contact:{title:"contact"},
    }
}