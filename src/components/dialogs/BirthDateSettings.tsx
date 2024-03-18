import React from 'react'
import {useLingui} from '@lingui/react'
import {Trans, msg} from '@lingui/macro'
import {View} from 'react-native'

import * as Dialog from '#/components/Dialog'
import {Text} from '../Typography'
import {logger} from '#/logger'
import {
  usePreferencesQuery,
  usePreferencesSetBirthDateMutation,
  UsePreferencesQueryResponse,
} from '#/state/queries/preferences'
import {Button, ButtonIcon, ButtonText} from '../Button'
import {atoms as a, useTheme} from '#/alf'
import {ErrorMessage} from '#/view/com/util/error/ErrorMessage'
import {cleanError} from '#/lib/strings/errors'
import {isIOS, isWeb} from '#/platform/detection'
import {Loader} from '#/components/Loader'
import {DateField, utils} from '#/components/forms/DateField'

export function BirthDateSettingsDialog({
  control,
}: {
  control: Dialog.DialogControlProps
}) {
  const t = useTheme()
  const {_} = useLingui()
  const {isLoading, error, data: preferences} = usePreferencesQuery()

  return (
    <Dialog.Outer control={control}>
      <Dialog.Handle />

      <Dialog.ScrollableInner label={_(msg`My Birthday`)}>
        <View style={[a.gap_sm, a.pb_lg]}>
          <Text style={[a.text_2xl, a.font_bold]}>
            <Trans>My Birthday</Trans>
          </Text>
          <Text style={[a.text_md, t.atoms.text_contrast_medium]}>
            <Trans>This information is not shared with other users.</Trans>
          </Text>
        </View>

        {isLoading ? (
          <Loader size="xl" />
        ) : error || !preferences ? (
          <ErrorMessage
            message={
              error?.toString() ||
              _(
                msg`We were unable to load your birth date preferences. Please try again.`,
              )
            }
            style={[a.rounded_sm]}
          />
        ) : (
          <BirthdayInner control={control} preferences={preferences} />
        )}

        <Dialog.Close />
      </Dialog.ScrollableInner>
    </Dialog.Outer>
  )
}

function BirthdayInner({
  control,
  preferences,
}: {
  control: Dialog.DialogControlProps
  preferences: UsePreferencesQueryResponse
}) {
  const {_} = useLingui()
  const [date, setDate] = React.useState(
    utils.toSimpleDateString(preferences.birthDate || new Date()),
  )
  const {
    isPending,
    isError,
    error,
    mutateAsync: setBirthDate,
  } = usePreferencesSetBirthDateMutation()
  const hasChanged = React.useMemo(
    () =>
      date !== utils.toSimpleDateString(preferences.birthDate || new Date()),
    [date, preferences.birthDate],
  )

  const onSave = React.useCallback(async () => {
    try {
      // skip if date is the same
      if (hasChanged) {
        await setBirthDate({birthDate: new Date(date)})
      }
      control.close()
    } catch (e: any) {
      logger.error(`setBirthDate failed`, {message: e.message})
    }
  }, [date, setBirthDate, control, hasChanged])

  return (
    <View style={a.gap_lg} testID="birthDateSettingsDialog">
      <View style={isIOS && [a.w_full, a.align_center]}>
        <DateField
          label={_(msg`Enter your birthday`)}
          value={date}
          onChangeDate={setDate}
        />
      </View>

      {isError ? (
        <ErrorMessage message={cleanError(error)} style={[a.rounded_sm]} />
      ) : undefined}

      <View style={isWeb && [a.flex_row, a.justify_end]}>
        <Button
          label={hasChanged ? _(msg`Save birthday`) : _(msg`Done`)}
          size="medium"
          onPress={onSave}
          variant="solid"
          color="primary">
          <ButtonText>
            {hasChanged ? <Trans>Save</Trans> : <Trans>Done</Trans>}
          </ButtonText>
          {isPending && <ButtonIcon icon={Loader} />}
        </Button>
      </View>
    </View>
  )
}
