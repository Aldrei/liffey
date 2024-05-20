import { AuthClientsSetup, AuthTokensSetup, BannersSetup, CitiesSetup, EmployeesSetup, NeighborhoodsSetup, OwnersSetup, PhotosSetup, PropertiesSetup, RoleUserSetup, RolesSetup, UsersSetup, VideosSetup } from '@/database/models';

export const syncAssociations = async () => {
  try {
    // await AnalyticsSetup.syncAssociations()
    await BannersSetup.syncAssociations()
    await CitiesSetup.syncAssociations()
    // await ContentsSetup.syncAssociations()
    // await DomainsSetup.syncAssociations()
    // await EmailsSetup.syncAssociations()
    await EmployeesSetup.syncAssociations()
    // await EmployeesEmailsSetup.syncAssociations()
    // await MessagesSetup.syncAssociations()
    await NeighborhoodsSetup.syncAssociations()
    // await OrdersSetup.syncAssociations()
    await OwnersSetup.syncAssociations()
    // await PalettesSetup.syncAssociations()
    // await PasswordsResetsSetup.syncAssociations()
    // await PaymentsCategoriesSetup.syncAssociations()
    // await PaymentsSetup.syncAssociations()
    await PhotosSetup.syncAssociations()
    // await PlansSetup.syncAssociations()
    await PropertiesSetup.syncAssociations()
    // await PropertiesAgenciesSetup.syncAssociations()
    // await ProspectsSetup.syncAssociations()
    // await ReceivablesSetup.syncAssociations()
    // await ReceivablesCategoriesSetup.syncAssociations()
    // await StatesSetup.syncAssociations()
    // await SubscriptionsSetup.syncAssociations()
    // await ThemesSetup.syncAssociations()
    await UsersSetup.syncAssociations()
    await RolesSetup.syncAssociations()
    // await PermissionsSetup.syncAssociations()
    await RoleUserSetup.syncAssociations()
    // await RolePermissionSetup.syncAssociations()
    await VideosSetup.syncAssociations()
    await AuthTokensSetup.syncAssociations()
    await AuthClientsSetup.syncAssociations()
  } catch (error) {
    console.error(error);
  }
}