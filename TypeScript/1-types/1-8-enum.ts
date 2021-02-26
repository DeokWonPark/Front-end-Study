{
    /**
     * Enum - 여러가지의 관련된 상수 값들을 모아서 정의
     */
    //javascript x
    const MAX_NUM = 6;
    const DAYS_ENUM =Object.freeze({"Monday":0,"Tuesday":1,})
    DAYS_ENUM.Monday

    //TypeScript - union으로 대체해서 사용하는것을 권장 -  enum은 타입이 보장되지 않는다.
    enum Days{
        Monday, // 0
        Tuesday, // 1
        Wenesday,
        Thursday,
        Friday,
        Satarday,
        Sunday,
    }

    type DaysOfWeek = 'Monday' | 'Tuesday' | "Wenesday"
    console.log(Days.Friday);
}