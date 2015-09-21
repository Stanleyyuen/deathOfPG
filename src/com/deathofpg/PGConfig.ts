module game {

    export class PGConfig {

        public constructor() { }

        private static ins: PGConfig;

        public static get Ins(): PGConfig {
            if (this.ins == null) this.ins = new PGConfig();
            return this.ins;
        }
        /**
        * 昵称
        */
        public NickName: string;
        /**
        * 用户金钱
        */
        public Glob:number=0;
        /**
        * 当前怪物的进度
        */
        public Count: number = 0;

        public addGlob(value: number): void {
            this.Glob = this.Glob + value;
        }
    }
} 