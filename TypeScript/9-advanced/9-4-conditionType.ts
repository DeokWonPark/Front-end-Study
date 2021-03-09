{
    type Check<T>=T extends string?number:boolean;

    type Type=Check<string>;
}