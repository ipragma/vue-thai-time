<!-- 
https://github.com/vuetifyjs/vuetify/issues/576 
https://stackblitz.com/edit/vuetify-v-counter?file=index.js
-->
<template>
	<v-text-field
    class="centered-input"
		append-outer-icon="add_circle_outline"
		:label="label"
		:outlined="outlined"
		prepend-icon="remove_circle_outline"
		:rules="rules"
		single-line
		:value="zeroPad(value)"
		@click:append-outer.stop="increase"
		@click:prepend.stop="decrease"
		@change="$emit('input', $event)"
    :readonly="readonly"
		:loop="loop"
		hide-details
	></v-text-field>
</template>

<script>
export default {
	name: 'NumberInput',
	props: {
		label: {
			type: String,
			default: '',
		},
		min: {
			type: Number,
			default: 0,
		},
		max: {
			type: Number,
			default: 9999,
		},
		maxLength: {
			type: Number,
			default: 4,
		},
		outlined: {
			type: Boolean,
			default: true,
		},
		rules: {
			type: Array,
			default: () => [],
		},
		step: {
			type: Number,
			default: 1,
		},
		value: [String, Number],
		readonly: {
			type: Boolean,
			default: false,
		},
		loop: {
			type: Boolean,
			default: false,
		},
	},
	computed: {

	},
	methods: {
		increase() {
			if (isNaN(parseInt(this.value))) 
				return this.$emit('input', this.step);
			if ((this.value + this.step) > this.max) {
				if (this.loop) 
					this.$emit('input', this.min)
				return;
			}
			this.$emit('input', parseInt(this.value) + this.step);
		},
		decrease () {
			if (isNaN(parseInt(this.value))) 
				return this.$emit('input', this.min);
			if ((this.value - this.step) < this.min) {
				if (this.loop) 
					this.$emit('input', this.max - this.step + 1)
				return;
			}
			this.$emit('input', parseInt(this.value) - this.step);
		},
    zeroPad(input) {
      let length = this.maxLength
      if(length > 0) {
        return (Array(length + 1).join("0") + input).slice(-length);
      }
      return input;
    }
	},
};
</script>

<style scoped>
.centered-input >>> input {
	text-align: center
}
</style>