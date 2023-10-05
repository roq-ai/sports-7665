import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createAdministrator } from 'apiSdk/administrators';
import { administratorValidationSchema } from 'validationSchema/administrators';
import { UserInterface } from 'interfaces/user';
import { CompanyInterface } from 'interfaces/company';
import { getUsers } from 'apiSdk/users';
import { getCompanies } from 'apiSdk/companies';
import { AdministratorInterface } from 'interfaces/administrator';

function AdministratorCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: AdministratorInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createAdministrator(values);
      resetForm();
      router.push('/administrators');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<AdministratorInterface>({
    initialValues: {
      admin_since: new Date(new Date().toDateString()),
      admin_until: new Date(new Date().toDateString()),
      access_level: '',
      user_id: (router.query.user_id as string) ?? null,
      company_id: (router.query.company_id as string) ?? null,
    },
    validationSchema: administratorValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Administrators',
              link: '/administrators',
            },
            {
              label: 'Create Administrator',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Administrator
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="admin_since" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Admin Since
            </FormLabel>
            <DatePicker
              selected={formik.values?.admin_since ? new Date(formik.values?.admin_since) : null}
              onChange={(value: Date) => formik.setFieldValue('admin_since', value)}
            />
          </FormControl>
          <FormControl id="admin_until" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Admin Until
            </FormLabel>
            <DatePicker
              selected={formik.values?.admin_until ? new Date(formik.values?.admin_until) : null}
              onChange={(value: Date) => formik.setFieldValue('admin_until', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.access_level}
            label={'Access Level'}
            props={{
              name: 'access_level',
              placeholder: 'Access Level',
              value: formik.values?.access_level,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <AsyncSelect<CompanyInterface>
            formik={formik}
            name={'company_id'}
            label={'Select Company'}
            placeholder={'Select Company'}
            fetcher={getCompanies}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/administrators')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'administrator',
    operation: AccessOperationEnum.CREATE,
  }),
)(AdministratorCreatePage);
