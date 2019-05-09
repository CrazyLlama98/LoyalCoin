<template>
  <AdminMenu v-if="role === 'Admin'" />
  <RetailerMenu v-else-if="role === 'Retailer'" />
  <CustomerMenu v-else/>
</template>

<script>
import AdminMenu from "@/components/AdminMenu";
import RetailerMenu from "@/components/RetailerMenu";
import CustomerMenu from "@/components/CustomerMenu";

export default {
  props: {
    role: String
  },
  components: {
    AdminMenu,
    RetailerMenu,
    CustomerMenu
  }
}
</script>

<style>

</style>
