<template>
    <div class="col-sm-7 col-md-5">
        <div class="panel panel-info">

            <div class="panel-heading">
                <h3 class="panel-title">
                    {{ stock.name }}
                    <small>(Price: {{ stock.price }} | Quantity: {{ stock.quantity }})</small>
                </h3>
            </div>

            <div class="panel-body">
                <div class="pull-left">
                    <input
                            type="number"
                            min="0"
                            class="form-control"
                            placeholder="Quantity"
                            v-model.number="quantity"
                            :class="{danger: insufficientQuantity}"
                    />
                </div>
                <div class="pull-right">
                    <button
                            class="btn btn-success"
                            @click="sellStock"
                            :disabled="insufficientQuantity || quantity <= 0"
                    >
                        {{ insufficientQuantity ? 'Not enough Stocks' : 'Sell' }}
                    </button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: "Stock",
        props: ['stock'],
        data () {
            return {
                quantity: 0
            };
        },
        computed: {
            insufficientQuantity () {
                return this.quantity > this.stock.quantity;
            }
        },
        methods: {
            ...mapActions({
                placeSellOrder: 'sellStock'
            }),
            sellStock () {
                const order = {
                    stockId: this.stock.id,
                    stockPrice: this.stock.price,
                    stockQuantity: this.quantity
                };
                this.placeSellOrder(order);
                this.quantity = 0;
            }
        }
    }
</script>

<style scoped>
    .danger {
        border: 1px solid red;
    }
</style>