<template>
  <table>
    <slot>
      <!-- 테이블 컴포넌트에 아무값도 안들어갔으면 슬롯 안에있는 기본값이 들어간다 -->
      <tr>
        <td></td>
      </tr>
    </slot>
  </table>
</template>

<script>
export default {};
</script>
