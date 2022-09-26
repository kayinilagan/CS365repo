Vue.createApp({
    data() {
        return {
            operand1: 5,
            operand2: 5
        };
    },
    methods: {
        isPositiveInteger(a) {
            return Number.isInteger(a) && (a >= 1);
        },
        isNonNegativeInteger(a) {
            return Number.isInteger(a) && (a >= 0)
        }
    },
    computed: {
        singleOk() {
            return Number.isFinite(this.operand1);
        },
        doubleOk() {
            return Number.isFinite(this.operand1) && Number.isFinite(this.operand2);
        },
        factorial() {
            let ret = 1;
            for (let i = 1; i <= Math.min(this.operand1, 200); i++) {
                ret *= i;
            }
            return ret;
        },
        sum() {
            return (this.operand1 * (this.operand1 + 1)) / 2
        },
        sumDisplay() {
            if (this.operand1 < 4) {
                if (this.operand1 == 3) {
                    return "1 + 2 +";
                } else if (this.operand1 == 2) {
                    return "1 + ";
                } else {
                    return "";
                }
            } else {
                return "1 + 2 + ... + ";
            }
        }
    }
}).mount('#app');