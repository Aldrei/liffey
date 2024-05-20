import { AnalyticsSetup, AuthClientsSetup, AuthTokensSetup, BannersSetup, CitiesSetup, ClientsSetup, ContentsSetup, DomainsSetup, EmailsSetup, EmployeesEmailsSetup, EmployeesSetup, MessagesSetup, NeighborhoodsSetup, OrdersSetup, OwnersSetup, PalettesSetup, PasswordsResetsSetup, PaymentsCategoriesSetup, PaymentsSetup, PhotosSetup, PlansSetup, PropertiesAgenciesSetup, PropertiesSetup, ProspectsSetup, ReceivablesCategoriesSetup, ReceivablesSetup, RoleUserSetup, RolesSetup, StatesSetup, SubscriptionsSetup, ThemesSetup, UsersSetup, VideosSetup } from '@/database/models';

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
    await RoleUserSetup.syncRelationships()
    await VideosSetup.syncRelationships()
    await AuthTokensSetup.syncRelationships()
    await AuthClientsSetup.syncRelationships()
  } catch (error) {
    console.error(error);
  }
}