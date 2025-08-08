export default function UserButton() {
	return (
		<div className="flex items-center gap-2 cursor-pointer">
			<div className="w-8 h-8 rounded-full overflow-hidden">
				<img
					src="https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yeXppZEF6anBLU1FiakFMZjNkUTV3VTlYcE8iLCJyaWQiOiJ1c2VyXzMxME1jaGM3YTdUdzF5NUFkdm9lcm1PTHRGNiJ9?width=160"
					alt=""
					className="object-cover"
				/>
			</div>
			<div className="flex flex-col">
				<h1 className="text-sm font-medium">John Warren</h1>
				<p className="text-xs text-gray-500">@john_warren</p>
			</div>
		</div>
	);
}
