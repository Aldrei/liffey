import { AnalyticsSetup, BannersSetup, CitiesSetup, ClientsSetup, ContentsSetup, DomainsSetup, EmailsSetup, EmployeesEmailsSetup, EmployeesSetup, MessagesSetup, NeighborhoodsSetup, OrdersSetup, OwnersSetup, PalettesSetup, PasswordsResetsSetup, PaymentsCategoriesSetup, PaymentsSetup, PermissionsSetup, PhotosSetup, PlansSetup, PropertiesAgenciesSetup, PropertiesSetup, ProspectsSetup, ReceivablesCategoriesSetup, ReceivablesSetup, RolePermissionSetup, RoleUserSetup, RolesSetup, StatesSetup, SubscriptionsSetup, ThemesSetup, UsersSetup, VideosSetup } from '@/database/models';

export const syncRelationships = async () => {
  try {
    await AnalyticsSetup.syncRelationships()
    await BannersSetup.syncRelationships()
    await CitiesSetup.syncRelationships()
    await ClientsSetup.syncRelationships()
    await ContentsSetup.syncRelationships()
    await DomainsSetup.syncRelationships()
    await EmailsSetup.syncRelationships()
    await EmployeesSetup.syncRelationships()
    await EmployeesEmailsSetup.syncRelationships()
    await MessagesSetup.syncRelationships()
    await NeighborhoodsSetup.syncRelationships()
    await OrdersSetup.syncRelationships()
    await OwnersSetup.syncRelationships()
    await PalettesSetup.syncRelationships()
    await PasswordsResetsSetup.syncRelationships()
    await PaymentsCategoriesSetup.syncRelationships()
    await PaymentsSetup.syncRelationships()
    await PhotosSetup.syncRelationships()
    await PlansSetup.syncRelationships()
    await PropertiesSetup.syncRelationships()
    await PropertiesAgenciesSetup.syncRelationships()
    await ProspectsSetup.syncRelationships()
    await ReceivablesSetup.syncRelationships()
    await ReceivablesCategoriesSetup.syncRelationships()
    await StatesSetup.syncRelationships()
    await SubscriptionsSetup.syncRelationships()
    await ThemesSetup.syncRelationships()
    await UsersSetup.syncRelationships()
    await RolesSetup.syncRelationships()
    await PermissionsSetup.syncRelationships()
    await RoleUserSetup.syncRelationships()
    await RolePermissionSetup.syncRelationships()
    await VideosSetup.syncRelationships()
  } catch (error) {
    console.error(error);
  }
}