import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
// ... 其他导入 ...

export const Navbar = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { locale } = router;
  
  // ... 现有代码 ...
  
  return (
    <Header height={60} px="md">
      <Container className={classes.inner} fluid>
        <Group>
          <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
          <Link href="/" className={classes.logo}>
            <Image src="/assets/logo.svg" alt="JSON Crack" width={28} height={28} />
            <Text fw={700}>JSON Crack</Text>
          </Link>
        </Group>

        <Group>
          {/* 使用翻译文本 */}
          <Button
            component={Link}
            href={`/${locale !== 'en' ? `${locale}/` : ''}editor`}
            variant="default"
            rightSection={<LuArrowRight />}
          >
            {t('goToEditor')}
          </Button>
          {/* ... 其他导航项 ... */}
        </Group>
      </Container>
    </Header>
  );
};