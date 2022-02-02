export interface IUserInput {
    SearchQuery: (string | null);
    GenFilter: {
        gen1:boolean,
        gen2:boolean,
        gen3:boolean,
        gen4:boolean,
        gen5:boolean,
        gen6:boolean,
    }
}