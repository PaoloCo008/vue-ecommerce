<script lang="ts" setup>
import { ref } from 'vue'

const activeFooterCollapse = ref([''])

const footerLinkList = {
  company: [
    {
      title: 'About',
    },
    {
      title: 'Press',
    },
    {
      title: 'Privacy Policy',
    },
    {
      title: 'Terms of Service',
    },
  ],
  support: [
    {
      title: 'Contact Us',
    },
    {
      title: 'Cookie Preferences',
    },
    {
      title: 'FAQ',
    },
  ],
  connect: [
    {
      title: 'Instagram',
      icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg',
    },
    {
      title: 'Facebook',
      icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/facebook.svg',
    },
    {
      title: 'tiktok',
      icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tiktok.svg',
    },
  ],
}
</script>

<template>
  <footer class="footer">
    <el-collapse v-model="activeFooterCollapse" class="footer-collapse mobile-links">
      <el-collapse-item title="Company" name="1">
        <ul class="collapse-content">
          <li v-for="link in footerLinkList.company" :key="link.title">{{ link.title }}</li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="Support" name="2">
        <ul class="collapse-content">
          <li v-for="link in footerLinkList.support" :key="link.title">{{ link.title }}</li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="Connect" name="3">
        <ul class="collapse-content">
          <li v-for="link in footerLinkList.connect" :key="link.title">
            <div class="social-link-wrapper">
              <img :src="link.icon" :alt="link.title" class="social-link-icon" />
              {{ link.title }}
            </div>
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>

    <div class="desktop-links">
      <div>
        <h4 class="link-header">Company</h4>
        <div class="footer-link">
          <p v-for="link in footerLinkList.company" :key="link.title">
            {{ link.title }}
          </p>
        </div>
      </div>
      <div>
        <h4 class="link-header">Support</h4>
        <div class="footer-link">
          <p v-for="link in footerLinkList.support" :key="link.title">
            {{ link.title }}
          </p>
        </div>
      </div>
      <div>
        <h4 class="link-header">Connect</h4>
        <div class="footer-link">
          <div class="social-link-wrapper" v-for="link in footerLinkList.connect" :key="link.title">
            <img :src="link.icon" :alt="link.title" class="social-link-icon" />
            {{ link.title }}
          </div>
        </div>
      </div>
    </div>

    <div class="footer-logo">
      <div>Logo</div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: auto;
  display: grid;
  gap: 3rem;
  width: 100%;
  padding: 1rem;
}

.collapse-content {
  list-style: none;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  font-size: 0.75rem;
}

:deep(.el-collapse-item__title) {
  padding: 0.5rem 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
}

:deep(.el-collapse-item__content) {
  padding-bottom: 0.5rem;
}

:deep(.el-collapse-item) {
  border-top: 1px solid #000;
}

:deep(.el-collapse-item:last-of-type) {
  border-bottom: 1px solid #000;
}

.social-link-icon {
  width: 12px;
  height: 12px;
}

.social-link-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 1.75rem;
}

.desktop-links {
  display: none;
}

.link-header {
  font-size: 1rem;
  text-transform: uppercase;
  margin-bottom: 1rem;
  font-weight: bold;
}

.footer-link {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.875rem;
}

@media screen and (min-width: 800px) {
  .footer {
    padding: 1rem 1.5rem;
  }

  .desktop-links {
    display: flex;
    width: 100%;
    gap: 7rem;
    border-top: 1px solid #000;
    padding: 4rem 0 0 1rem;
  }

  .mobile-links {
    display: none;
  }
}
</style>
