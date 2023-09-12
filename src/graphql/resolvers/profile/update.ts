import { Messages, ResolverWithoutParent } from '../../../../types';
import { ProfileMutations, ProfileMutationsUpdateArgs } from '../../../graphql.types';
import { prepareProfile } from '../../../models/helpers/prepareProfile';
import { GraphQLError } from 'graphql/index';
import { withAuth } from '../../auth';

export const updateRaw: ResolverWithoutParent<
  ProfileMutationsUpdateArgs,
  ProfileMutations['update'] | GraphQLError
> = async (_, { input }, { user }) => {
  try {
    const { name } = input;
    user.name = name;

    // Выполняем валидацию перед сохранением
    const validationError = user.validateSync();
    if (validationError) {
      // Если есть ошибки валидации, отправляем ValidationError
      return new GraphQLError(validationError.message, {
        extensions: {
          code: Messages.INVALID_NICKNAME,
          http: { status: 400 },
        },
      });
    }
    // Если валидация успешна, сохраняем документ
    await user.save();
    return prepareProfile(user);
  } catch (e) {
    return new GraphQLError(e.message, {
      extensions: {
        code: Messages.DATA_BASE_ERROR,
      },
    });
  }
};

export const update = withAuth(updateRaw);
